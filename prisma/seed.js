'use strict';

require('dotenv').config({ override: false });
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PERMISSIONS = [
  // Module 1: Trekking Packages
  { key: 'packages:read', module: 'packages', description: 'View trekking & tour packages' },
  { key: 'packages:write', module: 'packages', description: 'Create and edit packages and itineraries' },
  { key: 'packages:publish', module: 'packages', description: 'Publish or unpublish packages' },
  { key: 'packages:delete', module: 'packages', description: 'Archive or delete packages' },

  // Module 2: Destinations
  { key: 'destinations:read', module: 'destinations', description: 'View regional destinations' },
  { key: 'destinations:write', module: 'destinations', description: 'Create and edit destinations' },
  { key: 'destinations:publish', module: 'destinations', description: 'Publish destinations' },
  { key: 'destinations:delete', module: 'destinations', description: 'Delete destinations' },

  // Module 3: Blog Management
  { key: 'blogs:read', module: 'blogs', description: 'View blog posts and categories' },
  { key: 'blogs:write', module: 'blogs', description: 'Create and edit blog articles' },
  { key: 'blogs:publish', module: 'blogs', description: 'Publish or unpublish blog articles' },
  { key: 'blogs:delete', module: 'blogs', description: 'Delete blog articles' },

  // Module 4: Page Management
  { key: 'pages:read', module: 'pages', description: 'View CMS pages and team members' },
  { key: 'pages:write', module: 'pages', description: 'Edit About, Contact, FAQ, and static pages' },
  { key: 'pages:publish', module: 'pages', description: 'Publish page changes' },

  // Module 5: Media Library
  { key: 'media:read', module: 'media', description: 'Browse media library' },
  { key: 'media:write', module: 'media', description: 'Upload and update media metadata' },
  { key: 'media:delete', module: 'media', description: 'Delete unused media assets' },

  // Module 6: Inquiry Management
  { key: 'inquiries:read', module: 'inquiries', description: 'View customer inquiries' },
  { key: 'inquiries:write', module: 'inquiries', description: 'Update inquiry status and follow-up notes' },
  { key: 'inquiries:assign', module: 'inquiries', description: 'Assign inquiries to staff members' },
  { key: 'inquiries:export', module: 'inquiries', description: 'Export inquiries to CSV' },

  // Module 7: Reviews Management
  { key: 'reviews:read', module: 'reviews', description: 'View customer, video, and platform reviews' },
  { key: 'reviews:write', module: 'reviews', description: 'Create or edit reviews' },
  { key: 'reviews:moderate', module: 'reviews', description: 'Approve, reject, or feature reviews' },
  { key: 'reviews:delete', module: 'reviews', description: 'Delete reviews' },

  // Module 8: SEO Management
  { key: 'seo:read', module: 'seo', description: 'View SEO metadata and redirect rules' },
  { key: 'seo:write', module: 'seo', description: 'Edit meta tags, canonicals, schema, and redirects' },
  { key: 'seo:publish', module: 'seo', description: 'Rebuild sitemap and publish SEO updates' },

  // Module 9: Website Settings
  { key: 'settings:read', module: 'settings', description: 'View global site settings and menus' },
  { key: 'settings:write', module: 'settings', description: 'Update contact details, menus, and footer settings' },

  // Module 10: Admin & Permissions
  { key: 'users:read', module: 'users', description: 'View admin and staff accounts' },
  { key: 'users:write', module: 'users', description: 'Create, edit, and deactivate staff accounts' },
  { key: 'users:manage_roles', module: 'users', description: 'Modify role permission matrices' },
  { key: 'audit:read', module: 'audit', description: 'View system audit logs' }
];

const ROLE_DEFINITIONS = [
  {
    name: 'SUPER_ADMIN',
    displayName: 'Super Administrator',
    description: 'Full unrestricted access to all CMS modules, user roles, settings, and publishing.',
    isSystem: true,
    permissionKeys: PERMISSIONS.map((p) => p.key)
  },
  {
    name: 'ADMIN',
    displayName: 'Administrator',
    description: 'Full operational access across content, inquiries, SEO, settings, and staff accounts.',
    isSystem: true,
    permissionKeys: PERMISSIONS.filter((p) => p.key !== 'users:manage_roles').map((p) => p.key)
  },
  {
    name: 'EDITOR',
    displayName: 'Content Editor',
    description: 'Manage and publish trekking packages, destinations, blogs, pages, media, and reviews.',
    isSystem: true,
    permissionKeys: [
      'packages:read', 'packages:write', 'packages:publish',
      'destinations:read', 'destinations:write', 'destinations:publish',
      'blogs:read', 'blogs:write', 'blogs:publish',
      'pages:read', 'pages:write', 'pages:publish',
      'media:read', 'media:write',
      'reviews:read', 'reviews:write', 'reviews:moderate',
      'seo:read', 'seo:write'
    ]
  },
  {
    name: 'SALES_STAFF',
    displayName: 'Sales & Inquiry Staff',
    description: 'View packages and manage customer inquiries, follow-up notes, and status updates.',
    isSystem: true,
    permissionKeys: [
      'packages:read',
      'destinations:read',
      'inquiries:read', 'inquiries:write', 'inquiries:assign', 'inquiries:export',
      'reviews:read'
    ]
  },
  {
    name: 'SEO_MANAGER',
    displayName: 'SEO & Growth Manager',
    description: 'Manage meta titles, descriptions, canonicals, structured data, redirects, and sitemaps.',
    isSystem: true,
    permissionKeys: [
      'packages:read',
      'destinations:read',
      'blogs:read',
      'pages:read',
      'seo:read', 'seo:write', 'seo:publish',
      'settings:read'
    ]
  }
];

const INITIAL_DESTINATIONS = [
  { slug: 'everest-region-treks', name: 'Everest Region', regionKey: 'everest', displayOrder: 1, tagline: 'Khumbu & Sagarmatha High-Altitude Classics' },
  { slug: 'annapurna-region-treks', name: 'Annapurna Region', regionKey: 'annapurna', displayOrder: 2, tagline: 'Sanctuary, Circuit & Mardi Himal Ridge Trails' },
  { slug: 'langtang-region-treks', name: 'Langtang Region', regionKey: 'langtang', displayOrder: 3, tagline: 'Valley of Glaciers, Gosaikunda & Tamang Heritage' },
  { slug: 'manaslu-region-treks', name: 'Manaslu Region', regionKey: 'manaslu', displayOrder: 4, tagline: 'Restricted Circuit & Sacred Tsum Valley' },
  { slug: 'mustang-region-treks', name: 'Upper Mustang', regionKey: 'mustang', displayOrder: 5, tagline: 'Forbidden Kingdom of Lo Manthang' },
  { slug: 'dolpo-region-treks', name: 'Dolpo Region', regionKey: 'dolpo', displayOrder: 6, tagline: 'Remote Trans-Himalayan Wilderness & Phoksundo' },
  { slug: 'kanchenjunga-region-treks', name: 'Kanchenjunga Region', regionKey: 'kanchenjunga', displayOrder: 7, tagline: 'Eastern Nepal 8,586m Base Camp Expedition' },
  { slug: 'makalu-region-treks', name: 'Makalu Region', regionKey: 'makalu', displayOrder: 8, tagline: 'Barun Valley & Makalu Base Camp Wilderness' },
  { slug: 'rolwaling-region-treks', name: 'Rolwaling Region', regionKey: 'rolwaling', displayOrder: 9, tagline: 'Tashi Lapcha Pass & Tsho Rolpa Glacial Lake' },
  { slug: 'ganesh-himal-region-treks', name: 'Ganesh Himal Region', regionKey: 'ganesh-himal', displayOrder: 10, tagline: 'Ruby Valley & Untouched Tamang Villages' }
];

const INITIAL_CATEGORIES = [
  { slug: 'trekking', name: 'Trekking Packages', sortOrder: 1 },
  { slug: 'peak-climbing', name: 'Peak Climbing Expeditions', sortOrder: 2 },
  { slug: 'cultural-tours', name: 'Cultural & Heritage Tours', sortOrder: 3 },
  { slug: 'helicopter-tours', name: 'Helicopter Tours', sortOrder: 4 },
  { slug: 'luxury-treks', name: 'Luxury Lodge Treks', sortOrder: 5 },
  { slug: 'restricted-area', name: 'Restricted Area Treks', sortOrder: 6 }
];

async function main() {
  console.log('Seeding Igloo Himalaya Treks CMS database...');

  // 1. Permissions
  const permMap = new Map();
  for (const perm of PERMISSIONS) {
    const saved = await prisma.permission.upsert({
      where: { key: perm.key },
      update: { module: perm.module, description: perm.description },
      create: perm
    });
    permMap.set(saved.key, saved.id);
  }
  console.log(`Synced ${permMap.size} permissions.`);

  // 2. Roles & RolePermissions
  const roleMap = new Map();
  for (const roleDef of ROLE_DEFINITIONS) {
    const role = await prisma.role.upsert({
      where: { name: roleDef.name },
      update: {
        displayName: roleDef.displayName,
        description: roleDef.description,
        isSystem: roleDef.isSystem
      },
      create: {
        name: roleDef.name,
        displayName: roleDef.displayName,
        description: roleDef.description,
        isSystem: roleDef.isSystem
      }
    });
    roleMap.set(role.name, role.id);

    // Sync permissions for system roles
    await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
    const links = roleDef.permissionKeys
      .map((key) => permMap.get(key))
      .filter(Boolean)
      .map((permissionId) => ({ roleId: role.id, permissionId }));

    if (links.length > 0) {
      await prisma.rolePermission.createMany({ data: links, skipDuplicates: true });
    }
  }
  console.log(`Synced ${roleMap.size} roles.`);

  // 3. Initial Super Admin User
  const adminEmail = (process.env.SEED_ADMIN_EMAIL || 'admin@igloohimalayatreks.com').toLowerCase().trim();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026';
  const adminName = process.env.SEED_ADMIN_NAME || 'Surya Lama';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      fullName: adminName,
      title: 'Founder & Managing Director',
      phone: '+977 9860843980',
      isActive: true,
      roleId: roleMap.get('SUPER_ADMIN')
    }
  });
  console.log(`Ensured Super Admin account: ${adminEmail}`);

  // 4. Site Settings (singleton id=1)
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: 'Igloo Himalaya Treks',
      legalName: 'Igloo Himalaya Treks Pvt. Ltd.',
      tagline: 'Your Trusted Gateway to the Himalayas',
      phonePrimary: '+977 9860843980',
      whatsappNumber: '9779860843980',
      emailPrimary: 'info@igloohimalayatreks.com',
      emailSecondary: 'igloohimalayatreks@gmail.com',
      officeAddress: 'Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal',
      officeHours: 'Sun - Fri: 09:00 AM - 07:00 PM (NPT)',
      geoLat: 27.7172,
      geoLng: 85.324,
      socialLinksJson: {
        facebook: 'https://www.facebook.com/profile.php?id=61572406411146',
        instagram: 'https://www.instagram.com/igloohimalayatreks/',
        youtube: 'https://www.youtube.com/@IglooHimalayaTreks',
        tiktok: 'https://www.tiktok.com/@igloohimalayatreks.com',
        linkedin: 'https://www.linkedin.com/in/igloo-himalaya-treks-268269433/',
        tripadvisor: 'https://www.tripadvisor.in/Attraction_Review-g293890-d33042443-Reviews-Igloo_Himalaya_Treks-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html',
        googleMaps: 'https://maps.app.goo.gl/ZkkNTjtTvv8gNe2F6'
      },
      tripadvisorAwardJson: {
        title: "Tripadvisor Travelers' Choice 2026 Best of the Best",
        badgeImage: 'images/travelers-choice-2026.svg'
      },
      copyrightText: '© 2026 Igloo Himalaya Treks. All rights reserved.',
      googleSiteVerification: 'Bf6VWgU5wazvCPTkWRFPQL37OLiv2GL6Xyv-WiCuj5o'
    }
  });
  console.log('Ensured baseline SiteSetting.');

  // 5. Seed Destinations & Package Categories
  for (const dest of INITIAL_DESTINATIONS) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: {
        ...dest,
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });
  }

  for (const cat of INITIAL_CATEGORIES) {
    await prisma.packageCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }

  // 6. Seed Default Navigation Menus
  const defaultMenus = [
    {
      location: 'HEADER_MOBILE',
      title: 'Mobile Accordion Treks Menu',
      itemsJson: [
        { label: 'Everest Base Camp Trek', href: '/trek/everest-base-camp-trek/', badge: '14 DAYS', group: 'Popular Himalayan Classics' },
        { label: 'Annapurna Circuit Trek', href: '/trek/annapurna-circuit-trek/', badge: '14 DAYS', group: 'Popular Himalayan Classics' },
        { label: 'Manaslu Circuit Trek', href: '/trek/manaslu-circuit-trek/', badge: '14 DAYS', group: 'Popular Himalayan Classics' },
        { label: 'Annapurna Base Camp Trek', href: '/trek/annapurna-base-camp-trek/', badge: '10 DAYS', group: 'Popular Himalayan Classics' },
        { label: 'Langtang Valley Trek', href: '/trek/langtang-valley-trek/', badge: '10 DAYS', group: 'Popular Himalayan Classics' },
        { label: 'Island Peak Climbing', href: '/trek/island-peak-climbing/', badge: '16 DAYS', group: 'Peak Climbing Expeditions' },
        { label: 'Upper Mustang Kingdom Trek', href: '/trek/upper-mustang-trek/', badge: '16 DAYS', group: 'Remote & Forbidden Kingdom' }
      ]
    },
    {
      location: 'FOOTER_LEGAL',
      title: 'Footer Legal Links',
      itemsJson: [
        { label: 'Privacy Policy', href: '/privacy-policy.html' },
        { label: 'Terms & Conditions', href: '/terms-and-conditions.html' },
        { label: 'Legal Documents', href: '/legal-documents.html' }
      ]
    }
  ];

  for (const menu of defaultMenus) {
    await prisma.navigationMenu.upsert({
      where: { location: menu.location },
      update: {},
      create: menu
    });
  }

  console.log('Seeded 10 destinations, 6 package categories, and baseline navigation menus.');
  console.log('CMS database seed complete.');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
