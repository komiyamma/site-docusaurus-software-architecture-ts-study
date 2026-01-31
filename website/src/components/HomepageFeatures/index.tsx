import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [

  {
    title: 'ADR TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScript/Reactプロジェクトにおける<br/>ADRの活用方法を学びます。<br/>フロントエンド特有の設計判断の記録。<br/>
      </>
    ),
    link: '/docs/adr_ts/adr_ts_index',
  },
  {
    title: 'YAGNI TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで実践するYAGNI。<br/>フロントエンド開発における<br/>MVP思考とスコープ管理。<br/>
      </>
    ),
    link: '/docs/yagni_ts/yagni_ts_index',
  },
  {
    title: 'KISS TS版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        TypeScript版KISS。<br/>型安全性と単純さのバランス、<br/>AIを活用したリファクタリング。<br/>
      </>
    ),
    link: '/docs/kiss_ts/kiss_ts_index',
  },
  {
    title: 'SOLID TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶSOLID原則。<br/>React/Node.js開発に活かす設計の基礎。<br/>型安全と柔軟性のバランス。<br/>
      </>
    ),
    link: '/docs/solid_ts/solid_ts_index',
  },
  {
    title: 'DRY TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶDRY。<br/>関数抽出や型による重複排除。<br/>保守性の高いフロントエンド開発の基礎。<br/>
      </>
    ),
    link: '/docs/dry_ts/dry_ts_index',
  },
  {
    title: 'SoC TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶSoC。<br/>フロントエンドの複雑さを<br/>責務の分離で解決する設計手法。<br/>
      </>
    ),
    link: '/docs/soc_ts/soc_ts_index',
  },
  {
    title: 'HC/LC TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶ高凝集・低結合。<br/>変更に強い設計とモジュール分割。<br/>フロントエンド開発での実践パターン。<br/>
      </>
    ),
    link: '/docs/hc_lc_ts/hc_lc_ts_index',
  },
  {
    title: 'MVC TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶMVCパターン。<br/>フロントエンドにおけるMVCの適用と<br/>状態管理・UI構築の分離。<br/>
      </>
    ),
    link: '/docs/mvc_ts/mvc_ts_index',
  },
  {
    title: 'DI TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶ依存性注入。<br/>関数/クラスへの注入パターンと<br/>IoC（制御の反転）の実践。<br/>
      </>
    ),
    link: '/docs/di_ts/di_ts_index',
  },
  {
    title: 'DIP TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶ依存性逆転。<br/>インターフェース分離と依存注入。<br/>結合度を下げ、変更に強い設計へ。<br/>
      </>
    ),
    link: '/docs/dip_ts/dip_ts_index',
  },
  {
    title: 'Is-a/Has-a TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶ合成（Composition）。<br/>is-a関係からhas-a関係への転換と、<br/>委譲（Delegation）を活用した柔軟な型設計。<br/>
      </>
    ),
    link: '/docs/isa_hasa_ts/isa_hasa_ts_index',
  },
  {
    title: '依存関係ルール TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶ依存関係ルール。<br/>importの方向制御とレイヤードアーキテクチャ。<br/>Lintによる強制と循環参照の防止。<br/>
      </>
    ),
    link: '/docs/dpn_rule_ts/dpn_rule_ts_index',
  },
  {
    title: 'レイヤー TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶレイヤードアーキテクチャ。<br/>フロントエンドの階層化設計。<br/>
      </>
    ),
    link: '/docs/layer_ts/layer_ts_index',
  },
  {
    title: 'Entity/VO TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶEntityとValue Object。<br/>型システムを活用した不変性と<br/>識別子の設計、バリデーションの実装。<br/>
      </>
    ),
    link: '/docs/entity_obj_ts/entity_obj_ts_index',
  },
  {
    title: 'ヘキサゴナル TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶヘキサゴナルアーキテクチャ。<br/>Port/Adapterによる外部依存の分離と、<br/>「中心」を汚さない設計思想を体感します。<br/>
      </>
    ),
    link: '/docs/hex_ts/hex_ts_index',
  },
  {
    title: 'エラーモデリング TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶエラーモデリング。<br/>型安全なエラー処理とResult型の実装。<br/>例外に頼らない堅牢な設計パターン。<br/>
      </>
    ),
    link: '/docs/err_model_ts/err_model_ts_index',
  },
  {
    title: 'Observer TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶObserverパターン。<br/>RxJSやリスナー登録など、<br/>非同期処理と状態監視の基礎。<br/>
      </>
    ),
    link: '/docs/observer_ts/observer_ts_index',
  },
  {
    title: 'クリーンアーキ TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶクリーンアーキテクチャ。<br/>
        Port/AdapterパターンやDIを駆使し、<br/>
        外部依存に振り回されない核を作ります。<br/>
      </>
    ),
    link: '/docs/clean_ts/clean_ts_index',
  },
  {
    title: 'CQS TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶCQS。<br/>
        副作用の制御と型安全な参照の分離。<br/>
        堅牢なアプリケーション設計の基礎を学びます。<br/>
      </>
    ),
    link: '/docs/cqs_ts/cqs_ts_index',
  },
  {
    title: 'CQRS TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで実践するCQRS。<br/>CommandとQueryの分離から、<br/>ドメインイベントを用いた非同期投影（Projection）まで。<br/>
      </>
    ),
    link: '/docs/cqrs_ts/cqrs_ts_index',
  },
  {
    title: '不変条件 TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptの型システムとバリデーションを組み合わせ、<br/>「不正な値をドメイン層に入れない」<br/>境界設計を学びます。<br/>
      </>
    ),
    link: '/docs/invariants_ts/invariants_ts_index',
  },
  {
    title: 'SemVer TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptで学ぶセマンティックバージョニング。<br/>
        npm依存管理、型の互換性判断、<br/>
        プレリリースとリリース自動化の実践。<br/>
      </>
    ),
    link: '/docs/svbc_ts/svbc_ts_index',
  },
  {
    title: '状態機械 TS版',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScriptの型システムを駆使して、<br/>「型で守る」状態機械の構築を学びます。<br/>副作用の分離、Reducerパターン、非同期処理の管理。<br/>
      </>
    ),
    link: '/docs/state_machine_ts/state_machine_ts_index',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link to={link}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
