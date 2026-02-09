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
function generateStudyIds(folder: string, prefix: string, start: number, end: number): string[] {
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

function generateSidebarItems(folder: string, prefix: string, modules: { title?: string; start: number; end: number }[]) {
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


  kissTsSidebar: generateProjectSidebar('kiss_ts'),
  yagniTsSidebar: generateProjectSidebar('yagni_ts'),
  socTsSidebar: generateProjectSidebar('soc_ts'),
  adrTsSidebar: generateProjectSidebar('adr_ts'),
  hcLcTsSidebar: generateProjectSidebar('hc_lc_ts'),
  dryTsSidebar: generateProjectSidebar('dry_ts'),
  refactoringTsSidebar: generateProjectSidebar('refactoring_ts'),
  testableTsSidebar: generateProjectSidebar('testable_ts'),
  tddTsSidebar: [
    {
      type: 'doc',
      id: 'tdd_ts/tdd_ts_index',
    },
    ...[
      { title: "Part 1", start: 1, end: 10 },
      { title: "Part 2", start: 11, end: 20 },
      { title: "Part 3", start: 21, end: 30 },
      { title: "Part 4", start: 31, end: 40 },
      { title: "Part 5", start: 41, end: 50 },
      { title: "Part 6", start: 51, end: 60 },
    ].flatMap(mod => {
      const items = generateStudyIds('tdd_ts', 'tdd_ts', mod.start, mod.end);
      if (items.length === 0) return [];
      return [{
        type: 'category' as const,
        label: mod.title,
        items: items,
      }];
    }),
  ],
  errModelTsSidebar: generateProjectSidebar('err_model_ts'),
  layerTsSidebar: generateProjectSidebar('layer_ts'),
  mvcTsSidebar: generateProjectSidebar('mvc_ts'),
  dpnRuleTsSidebar: generateProjectSidebar('dpn_rule_ts'),
  dipTsSidebar: generateProjectSidebar('dip_ts'),
  diTsSidebar: generateProjectSidebar('di_ts'),
  isaHasaTsSidebar: generateProjectSidebar('isa_hasa_ts'),
  solidTsSidebar: generateProjectSidebar('solid_ts'),
  gofTsSidebar: [
    {
      type: 'doc',
      id: 'gof_ts/gof_ts_index',
    },
    ...[
      { title: "Part 0：はじめに・環境・学び方", start: 1, end: 10 },
      { title: "Part 1：GoFに入る前の土台", start: 11, end: 15 },
      { title: "Part 2：生成パターン (Creational)", start: 16, end: 35 },
      { title: "Part 3：構造パターン (Structural)", start: 36, end: 56 },
      { title: "Part 4：振る舞いパターン (Behavioral)", start: 57, end: 89 },
      { title: "Part 5：仕上げ", start: 90, end: 90 },
    ].map(mod => ({
      type: 'category' as const,
      label: mod.title,
      items: generateStudyIds('gof_ts', 'gof_ts', mod.start, mod.end),
    })),
  ],
  observerTsSidebar: generateProjectSidebar('observer_ts'),
  cqsTsSidebar: generateProjectSidebar('cqs_ts'),
  stateMachineTsSidebar: generateProjectSidebar('state_machine_ts'),
  invariantsTsSidebar: generateProjectSidebar('invariants_ts'),
  entityObjTsSidebar: generateProjectSidebar('entity_obj_ts'),
  dddTsSidebar: [
    {
      type: 'doc',
      id: 'ddd_ts/ddd_ts_index',
    },
    ...[
      { title: "Part 1：準備と全体像", start: 1, end: 10 },
      { title: "Part 2：ドメイン理解と言葉づくり", start: 11, end: 20 },
      { title: "Part 3：TypeScriptでDDDしやすい基礎体力", start: 21, end: 30 },
      { title: "Part 4：Value Object", start: 31, end: 40 },
      { title: "Part 5：Entity", start: 41, end: 50 },
      { title: "Part 6：Aggregate", start: 51, end: 60 },
      { title: "Part 7：ユースケース（Application）を作る", start: 61, end: 70 },
      { title: "Part 8：Repository / Factory / Domain Service", start: 71, end: 80 },
      { title: "Part 9：Specification / Policy / 時間 / エラー", start: 81, end: 90 },
      { title: "Part 10：Domain Event と連携", start: 91, end: 100 },
    ].map(mod => ({
      type: 'category' as const,
      label: mod.title,
      items: generateStudyIds('ddd_ts', 'ddd_ts', mod.start, mod.end),
    })),
  ],
  abTcbTsSidebar: generateProjectSidebar('ab_tcb_ts'),
  deTsSidebar: generateProjectSidebar('de_ts'),
  modMonoTsSidebar: generateProjectSidebar('mod_mono_ts'),
  hexTsSidebar: generateProjectSidebar('hex_ts'),
  cleanTsSidebar: generateProjectSidebar('clean_ts'),
  aclTsSidebar: generateProjectSidebar('acl_ts'),
  apiContractTsSidebar: generateProjectSidebar('api_contract_ts'),
  svbcTsSidebar: generateProjectSidebar('svbc_ts'),
  dbcTsSidebar: generateProjectSidebar('dbc_ts'),
  idemTsSidebar: generateProjectSidebar('idem_ts'),
  capTsSidebar: generateProjectSidebar('cap_ts'),
  outboxTsSidebar: generateProjectSidebar('outbox_ts'),
  sagaTsSidebar: generateProjectSidebar('saga_ts'),
  cqrsTsSidebar: generateProjectSidebar('cqrs_ts'),
  esTsSidebar: generateProjectSidebar('es_ts'),
  bcTsSidebar: generateProjectSidebar('bc_ts'),
};

export default sidebars;
