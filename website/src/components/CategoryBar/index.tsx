import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

type CategoryItem = {
  label: string;
  sidebarId: string;
  path: string;
};

/**
 * Category link definitions.
 * Each entry maps a sidebar to its index page and display label.
 * Order matches the original navbar order.
 */
export const categories: CategoryItem[] = [
  { label: 'KISS TS版',                    sidebarId: 'kissTsSidebar',           path: '/docs/kiss_ts/kiss_ts_index' },
  { label: 'YAGNI TS版',                   sidebarId: 'yagniTsSidebar',          path: '/docs/yagni_ts/yagni_ts_index' },
  { label: 'SoC TS版',                     sidebarId: 'socTsSidebar',            path: '/docs/soc_ts/soc_ts_index' },
  { label: 'ADR TS版',                     sidebarId: 'adrTsSidebar',            path: '/docs/adr_ts/adr_ts_index' },
  { label: 'HC/LC TS版',                   sidebarId: 'hcLcTsSidebar',           path: '/docs/hc_lc_ts/hc_lc_ts_index' },
  { label: 'DRY TS版',                     sidebarId: 'dryTsSidebar',            path: '/docs/dry_ts/dry_ts_index' },
  { label: 'リファクタリング TS版',          sidebarId: 'refactoringTsSidebar',    path: '/docs/refactoring_ts/refactoring_ts_index' },
  { label: 'テスタブル TS版',               sidebarId: 'testableTsSidebar',       path: '/docs/testable_ts/testable_ts_index' },
  { label: 'TDD TS版',                     sidebarId: 'tddTsSidebar',            path: '/docs/tdd_ts/tdd_ts_index' },
  { label: 'エラーモデリング TS版',          sidebarId: 'errModelTsSidebar',       path: '/docs/err_model_ts/err_model_ts_index' },
  { label: 'レイヤー TS版',                 sidebarId: 'layerTsSidebar',          path: '/docs/layer_ts/layer_ts_index' },
  { label: 'MVC TS版',                     sidebarId: 'mvcTsSidebar',            path: '/docs/mvc_ts/mvc_ts_index' },
  { label: '依存関係ルール TS版',           sidebarId: 'dpnRuleTsSidebar',        path: '/docs/dpn_rule_ts/dpn_rule_ts_index' },
  { label: 'DIP TS版',                     sidebarId: 'dipTsSidebar',            path: '/docs/dip_ts/dip_ts_index' },
  { label: 'DI TS版',                      sidebarId: 'diTsSidebar',             path: '/docs/di_ts/di_ts_index' },
  { label: 'Is-a/Has-a TS版',              sidebarId: 'isaHasaTsSidebar',        path: '/docs/isa_hasa_ts/isa_hasa_ts_index' },
  { label: 'SOLID TS版',                   sidebarId: 'solidTsSidebar',          path: '/docs/solid_ts/solid_ts_index' },
  { label: 'GoFデザインパターン TS版',      sidebarId: 'gofTsSidebar',            path: '/docs/gof_ts/gof_ts_index' },
  { label: 'Observer TS版',                sidebarId: 'observerTsSidebar',       path: '/docs/observer_ts/observer_ts_index' },
  { label: 'CQS TS版',                     sidebarId: 'cqsTsSidebar',            path: '/docs/cqs_ts/cqs_ts_index' },
  { label: '状態機械 TS版',                 sidebarId: 'stateMachineTsSidebar',   path: '/docs/state_machine_ts/state_machine_ts_index' },
  { label: '不変条件 TS版',                 sidebarId: 'invariantsTsSidebar',     path: '/docs/invariants_ts/invariants_ts_index' },
  { label: 'Entity/VO TS版',               sidebarId: 'entityObjTsSidebar',      path: '/docs/entity_obj_ts/entity_obj_ts_index' },
  { label: 'DDD TS版',                     sidebarId: 'dddTsSidebar',            path: '/docs/ddd_ts/ddd_ts_index' },
  { label: '集約/境界 TS版',                sidebarId: 'abTcbTsSidebar',          path: '/docs/ab_tcb_ts/ab_tcb_ts_index' },
  { label: 'ドメインイベント TS版',          sidebarId: 'deTsSidebar',             path: '/docs/de_ts/de_ts_index' },
  { label: 'モジュラーモノリス TS版',        sidebarId: 'modMonoTsSidebar',        path: '/docs/mod_mono_ts/mod_mono_ts_index' },
  { label: 'ヘキサゴナル TS版',             sidebarId: 'hexTsSidebar',            path: '/docs/hex_ts/hex_ts_index' },
  { label: 'クリーンアーキ TS版',           sidebarId: 'cleanTsSidebar',          path: '/docs/clean_ts/clean_ts_index' },
  { label: 'ACL TS版',                     sidebarId: 'aclTsSidebar',            path: '/docs/acl_ts/acl_ts_index' },
  { label: 'API Contract TS版',            sidebarId: 'apiContractTsSidebar',    path: '/docs/api_contract_ts/api_contract_ts_index' },
  { label: 'SemVer TS版',                  sidebarId: 'svbcTsSidebar',           path: '/docs/svbc_ts/svbc_ts_index' },
  { label: 'DbC TS版',                     sidebarId: 'dbcTsSidebar',            path: '/docs/dbc_ts/dbc_ts_index' },
  { label: '冪等性 TS版',                   sidebarId: 'idemTsSidebar',           path: '/docs/idem_ts/idem_ts_index' },
  { label: 'CAP定理 TS版',                 sidebarId: 'capTsSidebar',            path: '/docs/cap_ts/cap_ts_index' },
  { label: 'Outbox TS版',                  sidebarId: 'outboxTsSidebar',         path: '/docs/outbox_ts/outbox_ts_index' },
  { label: 'Saga TS版',                    sidebarId: 'sagaTsSidebar',           path: '/docs/saga_ts/saga_ts_index' },
  { label: 'CQRS TS版',                    sidebarId: 'cqrsTsSidebar',           path: '/docs/cqrs_ts/cqrs_ts_index' },
  { label: 'イベントソーシング TS版',        sidebarId: 'esTsSidebar',             path: '/docs/es_ts/es_ts_index' },
  { label: 'BC TS版',                      sidebarId: 'bcTsSidebar',             path: '/docs/bc_ts/bc_ts_index' },
];

/**
 * Extracts the docs folder prefix from the current path to determine
 * which category is active. e.g. "/docs/kiss_ts/kiss_ts_study_001" → "kiss_ts"
 */
function getActiveFolder(pathname: string): string | null {
  const match = pathname.match(/^\/docs\/([^/]+)\//);
  return match ? match[1] : null;
}

export default function CategoryBar(): React.ReactNode {
  const { pathname } = useLocation();
  const activeFolder = getActiveFolder(pathname);

  return (
    <div className={styles.categoryBar}>
      <div className={styles.categoryBarInner}>
        {categories.map((cat) => {
          // Determine if this category is active based on the current URL path
          const folderMatch = cat.path.match(/^\/docs\/([^/]+)\//);
          const catFolder = folderMatch ? folderMatch[1] : '';
          const isActive = activeFolder === catFolder;

          return (
            <Link
              key={cat.sidebarId}
              to={cat.path}
              className={`${styles.categoryLink} ${isActive ? styles.categoryLinkActive : ''}`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
