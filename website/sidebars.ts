import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const fs = require('fs');
const path = require('path');

/**
 * Custom function to generate sidebar items from a directory.
 * It enforces that files ending with '_index.md' appear first in the list.
 */
function generateProjectSidebar(dirName: string) {
  const docsPath = path.join(__dirname, 'docs', dirName);

  if (!fs.existsSync(docsPath)) {
    console.warn(`Warning: Docs directory not found: ${docsPath}`);
    return [];
  }

  const files = fs.readdirSync(docsPath)
    .filter(file => file.endsWith('.md'))
    .sort((a, b) => {
      // Prioritize files containing '_index'
      const aIsIndex = a.includes('_index');
      const bIsIndex = b.includes('_index');

      if (aIsIndex && !bIsIndex) return -1;
      if (!aIsIndex && bIsIndex) return 1;

      return a.localeCompare(b);
    });

  return files.map(file => {
    const id = `${dirName}/${file.replace(/\.md$/, '')}`;
    return {
      type: 'doc' as const,
      id: id,
    };
  });
}




// Helper for DDD which uses manual grouping
export function generateStudyIds(folder: string, prefix: string, start: number, end: number): string[] {
  const ids: string[] = [];
  for (let i = start; i <= end; i++) {
    const idStr = i.toString().padStart(3, '0');
    const id = `${folder}/${prefix}_study_${idStr}`;
    const filePath = path.join(__dirname, 'docs', `${id}.md`);
    if (fs.existsSync(filePath)) {
      ids.push(id);
    }
  }
  return ids || []; // Ensure always an array
}

export function generateSidebarItems(folder: string, prefix: string, modules: { title?: string; start: number; end: number }[]) {
  return modules.flatMap(mod => {
    const items = generateStudyIds(folder, prefix, mod.start, mod.end);

    // If title is provided, create a Category (Folder)
    if (mod.title) {
      return [{
        type: 'category' as const,
        label: mod.title,
        items: items.map(itemId => ({ type: 'doc' as const, id: itemId } as any)),
      }];
    }

    // If no title, expand as Flat Docs (No Folder)
    return items.map(id => ({
      type: 'doc' as const,
      id: id,
    } as any));
  });
}


const sidebars: SidebarsConfig = {


  entityObjTsSidebar: generateProjectSidebar('entity_obj_ts'),

  dryTsSidebar: generateProjectSidebar('dry_ts'),

  adrTsSidebar: generateProjectSidebar('adr_ts'),
  yagniTsSidebar: generateProjectSidebar('yagni_ts'),
  kissTsSidebar: generateProjectSidebar('kiss_ts'),
  solidTsSidebar: generateProjectSidebar('solid_ts'),
  socTsSidebar: generateProjectSidebar('soc_ts'),
  hcLcTsSidebar: generateProjectSidebar('hc_lc_ts'),
  mvcTsSidebar: generateProjectSidebar('mvc_ts'),
  diTsSidebar: generateProjectSidebar('di_ts'),
  dipTsSidebar: generateProjectSidebar('dip_ts'),
  isaHasaTsSidebar: generateProjectSidebar('isa_hasa_ts'),
  hexTsSidebar: generateProjectSidebar('hex_ts'),

  dpnRuleTsSidebar: generateProjectSidebar('dpn_rule_ts'),

  layerTsSidebar: generateProjectSidebar('layer_ts'),

  errModelTsSidebar: generateProjectSidebar('err_model_ts'),

  observerTsSidebar: generateProjectSidebar('observer_ts'),

  cleanTsSidebar: generateProjectSidebar('clean_ts'),

  cqsTsSidebar: generateProjectSidebar('cqs_ts'),
  cqrsTsSidebar: generateProjectSidebar('cqrs_ts'),
  invariantsTsSidebar: generateProjectSidebar('invariants_ts'),

  svbcTsSidebar: generateProjectSidebar('svbc_ts'),
  stateMachineTsSidebar: generateProjectSidebar('state_machine_ts'),
  aclTsSidebar: generateProjectSidebar('acl_ts'),
  capTsSidebar: generateProjectSidebar('cap_ts'),
  abTcbTsSidebar: generateProjectSidebar('ab_tcb_ts'),
  dbcTsSidebar: generateProjectSidebar('dbc_ts'),
  deTsSidebar: generateProjectSidebar('de_ts'),
  esTsSidebar: generateProjectSidebar('es_ts'),
};

export default sidebars;
