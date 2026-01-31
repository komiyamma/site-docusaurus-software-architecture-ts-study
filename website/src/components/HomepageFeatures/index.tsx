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
    title: 'DDD C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        ドメイン駆動設計（DDD）の基本概念と、<br/>C#を用いた実践的な実装パターンを学びます。<br/>戦略的設計から戦術的設計まで。<br/>
      </>
    ),
    link: '/docs/ddd_cs/ddd_cs_index',
  },
  {
    title: 'ADR C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Architecture Decision Records（ADR）の<br/>書き方と運用方法を学びます。<br/>C#プロジェクトでの実践例を中心に。<br/>
      </>
    ),
    link: '/docs/adr_cs/adr_cs_index',
  },
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
    title: 'YAGNI C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶYAGNI（You Aren't Gonna Need It）。<br/>「今必要なものだけ作る」技術と<br/>過剰な作り込みを防ぐ設計判断。<br/>
      </>
    ),
    link: '/docs/yagni_cs/yagni_cs_index',
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
    title: 'KISS C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#版KISS（Keep It Simple, Stupid）。<br/>複雑さを排除し、<br/>読みやすく変更しやすいコードを書く。<br/>
      </>
    ),
    link: '/docs/kiss_cs/kiss_cs_index',
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
    title: 'SOLID C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶSOLID原則。<br/>オブジェクト指向設計の基礎から実践まで、<br/>変更に強いコードの書き方を学びます。<br/>
      </>
    ),
    link: '/docs/solid_cs/solid_cs_index',
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
    title: 'DRY C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶDRY（重複排除）。<br/>コピペコードからの脱却と<br/>メソッド抽出など実践的なリファクタリング手法。<br/>
      </>
    ),
    link: '/docs/dry_cs/dry_cs_index',
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
    title: 'SoC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶSoC（関心の分離）。<br/>UI、ロジック、データアクセスの<br/>適切な分離と依存関係の整理。<br/>
      </>
    ),
    link: '/docs/soc_cs/soc_cs_index',
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
    title: 'HC/LC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶ高凝集・低結合。<br/>変更に強いコード設計の基礎。<br/>責務の分離と依存関係のコントロール。<br/>
      </>
    ),
    link: '/docs/hc_lc_cs/hc_lc_cs_index',
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
    title: 'MVC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶMVCパターン。<br/>Model-View-Controllerの責務分担と<br/>Webアプリケーション設計の基礎。<br/>
      </>
    ),
    link: '/docs/mvc_cs/mvc_cs_index',
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
    title: 'DI C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶ依存性注入（DI）。<br/>疎結合な設計とテスト容易性。<br/>変更に強いアーキテクチャの要。<br/>
      </>
    ),
    link: '/docs/di_cs/di_cs_index',
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
    title: 'DIP C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶ依存性逆転の原則。<br/>抽象への依存とDIコンテナの活用。<br/>テスト容易性と保守性の向上。<br/>
      </>
    ),
    link: '/docs/dip_cs/dip_cs_index',
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
    title: 'Is-a/Has-a C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶ合成（Composition）。<br/>「継承より合成」を合言葉に、<br/>変更に強く、部品として再利用可能な設計。<br/>
      </>
    ),
    link: '/docs/isa_hasa_cs/isa_hasa_cs_index',
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
    title: '依存関係ルール C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        依存関係ルール（Dependency Rule）の基本と、<br/>C#での実践的な適用方法を学びます。<br/>中心と外側を意識し、変更に強い設計を。<br/>
      </>
    ),
    link: '/docs/dpn_rule_cs/dpn_rule_cs_index',
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
    title: 'レイヤー C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶレイヤードアーキテクチャ。<br/>関心の分離と依存性の制御。<br/>
      </>
    ),
    link: '/docs/layer_cs/layer_cs_index',
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
    title: 'Entity/VO C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶEntityとValue Object。<br/>同一性による識別と値の不変性。<br/>ドメイン駆動設計の基礎となる実装パターン。<br/>
      </>
    ),
    link: '/docs/entity_obj_cs/entity_obj_cs_index',
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
    title: 'ヘキサゴナル C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶヘキサゴナルアーキテクチャ。<br/>Ports & Adaptersの基本概念から、<br/>外部依存に振り回されない堅牢な設計へ。<br/>
      </>
    ),
    link: '/docs/hex_cs/hex_cs_index',
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
    title: 'エラーモデリング C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        エラーを「仕様」として扱う設計手法を学びます。<br/>例外境界、Result型、ProblemDetailsなど、<br/>堅牢で運用しやすいエラー設計の実践パターン。<br/>
      </>
    ),
    link: '/docs/err_model_cs/err_model_cs_index',
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
    title: 'Observer C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶObserverパターン。<br/>イベント駆動やデータバインディングの<br/>基礎となる重要なパターン。<br/>
      </>
    ),
    link: '/docs/observer_cs/observer_cs_index',
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
    title: 'クリーンアーキ C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶクリーンアーキテクチャ。<br/>
        依存関係のルール、4層の責務、<br/>
        テスト容易な設計を体得します。<br/>
      </>
    ),
    link: '/docs/clean_cs/clean_cs_index',
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
    title: 'CQS C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶCQS（コマンド・クエリ分離）。<br/>
        「変更するなら返さない」原則を徹底し、<br/>
        読みやすくテストしやすいコードを目指します。<br/>
      </>
    ),
    link: '/docs/cqs_cs/cqs_cs_index',
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
    title: 'CQRS C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶCQRS（コマンド・クエリ責務分離）。<br/>「読む」と「書く」の責務を明確に分け、<br/>拡張性とパフォーマンスを両立させた設計を学びます。<br/>
      </>
    ),
    link: '/docs/cqrs_cs/cqrs_cs_index',
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
    title: '不変条件 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        「正しい状態しか存在させない」設計手法を学びます。<br/>ガード節、値オブジェクト、状態遷移のガードなど、<br/>C#での実践的なパターン。<br/>
      </>
    ),
    link: '/docs/invariants_cs/invariants_cs_index',
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
    title: 'SemVer C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        セマンティックバージョニング（SemVer）と互換性ポリシーを学びます。<br/>
        C#環境でのバージョン管理、破壊的変更の判断、<br/>
        NuGetパッケージの運用まで実践的に習得。<br/>
      </>
    ),
    link: '/docs/svbc_cs/svbc_cs_index',
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
    title: '状態機械 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        「学食モバイル注文」の題材を通して、<br/>状態機械の設計と実装を詳しく学びます。<br/>if文地獄からの脱却、単体テスト、永続化まで。<br/>
      </>
    ),
    link: '/docs/state_machine_cs/state_machine_cs_index',
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
