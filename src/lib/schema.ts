/**
 * Données structurées (schema.org).
 *
 * Ce que Google ne peut pas deviner, il ne l'affiche pas. Un tarif écrit dans
 * une carte HTML reste du décor ; le même tarif balisé peut apparaître dans la
 * page de résultats. Ces fonctions produisent le balisage à partir des mêmes
 * données que les pages — jamais d'un texte recopié, qui finirait par mentir.
 *
 * Règle : on ne balise que ce qui est vrai et visible sur la page. Un balisage
 * qui promet ce que la page ne montre pas est une cause de pénalité.
 */

import { asso } from '../data/association';
import type { Formation } from '../data/formations';
import type { Session } from './wix';

const SITE = 'https://www.secourismepourtous.org';
const ID_ORG = `${SITE}/#organisation`;

/** Communes réellement desservies, pour les postes de secours et les formations. */
export const communes = [
  'Nice', 'Cannes', 'Antibes', 'Cagnes-sur-Mer', 'Saint-Laurent-du-Var',
  'Villeneuve-Loubet', 'Grasse', 'Menton', 'Vallauris', 'Mandelieu-la-Napoule',
  'Mougins', 'Le Cannet', 'Vence', 'Saint-Jean-Cap-Ferrat', 'Beaulieu-sur-Mer',
];

/** Fiche de l'organisation, référencée par toutes les autres. */
export function organisation() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'EmergencyService'],
    '@id': ID_ORG,
    name: asso.nom,
    alternateName: asso.sigle,
    description: asso.baseline,
    foundingDate: String(asso.fondation),
    founder: { '@type': 'Person', name: asso.fondateur },
    url: SITE,
    logo: `${SITE}/img/logo-spt.png`,
    image: `${SITE}/img/secours-mer.jpg`,
    email: asso.contact.email,
    telephone: asso.contact.telephoneLien,
    address: {
      '@type': 'PostalAddress',
      streetAddress: asso.contact.adresse,
      postalCode: asso.contact.codePostal,
      addressLocality: asso.contact.ville,
      addressRegion: asso.contact.departement,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: asso.contact.latitude,
      longitude: asso.contact.longitude,
    },
    // Le rayon d'action compte autant que l'adresse : c'est lui qui rattache
    // l'association aux recherches faites depuis les communes voisines.
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Alpes-Maritimes' },
      ...communes.map((v) => ({ '@type': 'City', name: v })),
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        credentialCategory: 'Certification qualité — actions de formation',
        identifier: 'QUA009665',
        url: `${SITE}/documents/certificat-qualiopi.pdf`,
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Fédération Française de Sauvetage et de Secourisme',
      url: 'https://www.ffss.fr',
    },
    identifier: asso.identifiants.rna,
  };
}

/** Fil d'Ariane : Google le reprend tel quel sous le titre du résultat. */
export function filAriane(etapes: { nom: string; chemin: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: etapes.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.nom,
      item: `${SITE}${e.chemin}`,
    })),
  };
}

/** Extrait le premier nombre d'un tarif (« 280 € » → 280). */
const montant = (t: string) => {
  const m = t.replace(/\s/g, '').match(/(\d+([.,]\d+)?)/);
  return m ? Number(m[1].replace(',', '.')) : null;
};

/** Convertit « 35 heures » en durée ISO 8601 (« PT35H »), exigée par Google. */
const dureeIso = (d: string) => {
  const m = d.replace(',', '.').match(/([\d.]+)\s*(heure|h|jour)/i);
  if (!m) return undefined;
  const n = Number(m[1]);
  if (/jour/i.test(m[2])) return `P${Math.round(n)}D`;
  return `PT${Number.isInteger(n) ? n : n.toFixed(1)}H`;
};

/**
 * Fiche d'une formation, avec ses sessions rattachées.
 *
 * Google exige, pour afficher une formation, qu'elle porte au moins un mode de
 * suivi (`courseMode`) et une occurrence datée. Une formation sans session
 * ouverte est donc balisée sans `hasCourseInstance` : mieux vaut ne rien
 * annoncer que d'annoncer une date qui n'existe pas.
 */
export function coursFormation(f: Formation, sessions: Session[]) {
  const prix = montant(f.tarif);
  const lieu = {
    '@type': 'Place',
    name: asso.nom,
    address: {
      '@type': 'PostalAddress',
      streetAddress: asso.contact.adresse,
      postalCode: asso.contact.codePostal,
      addressLocality: asso.contact.ville,
      addressCountry: 'FR',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE}/formations/${f.slug}#cours`,
    name: `${f.sigle} — ${f.intitule}`,
    description: f.accroche,
    url: `${SITE}/formations/${f.slug}`,
    provider: { '@id': ID_ORG },
    inLanguage: 'fr',
    educationalCredentialAwarded: f.certifiante ? f.certification : undefined,
    coursePrerequisites: f.prerequis,
    timeRequired: dureeIso(f.duree),
    ...(prix !== null && {
      offers: {
        '@type': 'Offer',
        price: prix,
        priceCurrency: 'EUR',
        category: 'Frais de formation',
        availability: f.suspendue
          ? 'https://schema.org/Discontinued'
          : 'https://schema.org/InStock',
        url: `${SITE}/formations/${f.slug}`,
      },
    }),
    ...(sessions.length > 0 && !f.suspendue && {
      hasCourseInstance: sessions.slice(0, 20).map((s) => ({
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        courseWorkload: dureeIso(f.duree),
        startDate: s.debut.toISOString(),
        ...(s.fin && { endDate: s.fin.toISOString() }),
        location: lieu,
        ...(prix !== null && {
          offers: {
            '@type': 'Offer',
            price: prix,
            priceCurrency: 'EUR',
            availability: s.complet
              ? 'https://schema.org/SoldOut'
              : 'https://schema.org/InStock',
            url: s.urlInscription ?? `${SITE}/formations/${f.slug}`,
          },
        }),
      })),
    }),
  };
}

/** Le service de dispositifs prévisionnels de secours. */
export function servicePostesDeSecours() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/postes-de-secours#service`,
    name: 'Dispositif prévisionnel de secours (DPS)',
    serviceType: 'Sécurité et secours à personnes lors d’événements',
    description:
      'Mise en place de postes de secours et d’équipes de secouristes diplômés sur les manifestations sportives, concerts, festivals et rassemblements de public dans les Alpes-Maritimes.',
    url: `${SITE}/postes-de-secours`,
    provider: { '@id': ID_ORG },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Alpes-Maritimes' },
      ...communes.map((v) => ({ '@type': 'City', name: v })),
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Organisateurs d’événements, collectivités, clubs sportifs, associations',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Devis établi selon la nature de l’événement, l’affluence et les risques identifiés.',
      },
      url: `${SITE}/contact?motif=dps`,
    },
  };
}

/** Questions fréquentes : c'est le balisage qui permet la réponse directe. */
export function questionsFrequentes(qr: { question: string; reponse: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qr.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  };
}
