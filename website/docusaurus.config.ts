import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'fs';
import * as path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'software-architecture.komiyamma.net',
  tagline: 'ソフトウェアアーキテクチャ入門者用の学習教材',
  favicon: 'img/react_logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://software-architecture-cs.komiyamma.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'komiyamma', // Usually your GitHub org/user name.
  projectName: 'site-docusaurus-software-architecture-cs-study', // Usually your repo name.

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },

  markdown: {
    format: 'detect',  // .md は CommonMark、.mdx は MDX として処理
    mermaid: true,
    // 外部の .memo ファイルからページの description を読み込む
    parseFrontMatter: async (params) => {
      // デフォルトのパーサーを使用
      const result = await params.defaultParseFrontMatter(params);

      // すでに description があれば何もしない
      if (result.frontMatter.description) {
        return result;
      }

      // 対応する .memo ファイルのパスを計算
      // 以前: const memoPath = params.filePath.replace(/\.mdx?$/, '.memo');
      // 変更: .md ファイルがあるディレクトリの memo サブフォルダ内を探す
      const fileDir = path.dirname(params.filePath);
      const fileName = path.basename(params.filePath).replace(/\.mdx?$/, '.memo');
      const memoPath = path.join(fileDir, 'memo', fileName);

      // .memo ファイルが存在すれば description として読み込む
      if (fs.existsSync(memoPath)) {
        const memoContent = fs.readFileSync(memoPath, 'utf-8').trim().replace(/[\r\n]+/g, ' ');
        if (memoContent) {
          result.frontMatter.description = memoContent;
        }
      }

      return result;
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      "@easyops-cn/docusaurus-search-local",
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["ja"],
        indexBlog: false,
        indexPages: false,
        // Split search index by top-level docs folders to avoid a huge single JSON.
        searchContextByPaths: [
          "docs/adr_cs",
          "docs/adr_ts",
          "docs/ddd_cs",
          "docs/di_cs",
          "docs/di_ts",
          "docs/dip_cs",
          "docs/dip_ts",
          "docs/dpn_rule_cs",
          "docs/dpn_rule_ts",
          "docs/dry_cs",
          "docs/dry_ts",
          "docs/entity_obj_cs",
          "docs/entity_obj_ts",
          "docs/err_model_cs",
          "docs/err_model_ts",
          "docs/hc_lc_cs",
          "docs/hc_lc_ts",
          "docs/hex_cs",
          "docs/hex_ts",
          "docs/isa_hasa_cs",
          "docs/isa_hasa_ts",
          "docs/kiss_cs",
          "docs/kiss_ts",
          "docs/mvc_cs",
          "docs/mvc_ts",
          "docs/soc_cs",
          "docs/soc_ts",
          "docs/solid_cs",
          "docs/solid_ts",
          "docs/yagni_cs",
          "docs/yagni_ts",
          "docs/clean_cs",
          "docs/clean_ts",
          "docs/cqs_cs",
          "docs/cqs_ts",
          "docs/cqrs_cs",
          "docs/cqrs_ts",
          "docs/invariants_cs",
          "docs/invariants_ts",
          "docs/svbc_cs",
          "docs/svbc_ts",
          "docs/state_machine_cs",
          "docs/state_machine_ts",
        ],
        hideSearchBarWithNoSearchContext: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.

        },
        blog: false, // Blog機能は無効化 (フォルダ削除済み)
        /*
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.

          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        */
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Home',
        src: 'img/home_light.svg',
        srcDark: 'img/home_dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'dddCsSidebar',
          position: 'left',
          label: 'DDD C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'adrCsSidebar',
          position: 'left',
          label: 'ADR C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'adrTsSidebar',
          position: 'left',
          label: 'ADR TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'yagniCsSidebar',
          position: 'left',
          label: 'YAGNI C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'yagniTsSidebar',
          position: 'left',
          label: 'YAGNI TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'kissCsSidebar',
          position: 'left',
          label: 'KISS C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'kissTsSidebar',
          position: 'left',
          label: 'KISS TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'solidCsSidebar',
          position: 'left',
          label: 'SOLID C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'solidTsSidebar',
          position: 'left',
          label: 'SOLID TS版',
        },

        {
          type: 'docSidebar',
          sidebarId: 'entityObjCsSidebar',
          position: 'left',
          label: 'Entity/VO C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'entityObjTsSidebar',
          position: 'left',
          label: 'Entity/VO TS版',
        },

        {
          type: 'docSidebar',
          sidebarId: 'dryCsSidebar',
          position: 'left',
          label: 'DRY C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dryTsSidebar',
          position: 'left',
          label: 'DRY TS版',
        },

        {
          type: 'docSidebar',
          sidebarId: 'socCsSidebar',
          position: 'left',
          label: 'SoC C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'socTsSidebar',
          position: 'left',
          label: 'SoC TS版',
        },

        {
          type: 'docSidebar',
          sidebarId: 'hcLcCsSidebar',
          position: 'left',
          label: 'HC/LC C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hcLcTsSidebar',
          position: 'left',
          label: 'HC/LC TS版',
        },

        {
          type: 'docSidebar',
          sidebarId: 'mvcCsSidebar',
          position: 'left',
          label: 'MVC C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'mvcTsSidebar',
          position: 'left',
          label: 'MVC TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'diCsSidebar',
          position: 'left',
          label: 'DI C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'diTsSidebar',
          position: 'left',
          label: 'DI TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dipCsSidebar',
          position: 'left',
          label: 'DIP C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dipTsSidebar',
          position: 'left',
          label: 'DIP TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'isaHasaCsSidebar',
          position: 'left',
          label: 'Is-a/Has-a C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'isaHasaTsSidebar',
          position: 'left',
          label: 'Is-a/Has-a TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dpnRuleCsSidebar',
          position: 'left',
          label: '依存関係ルール C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dpnRuleTsSidebar', // Corrected from rpn based on user confirmation
          position: 'left',
          label: '依存関係ルール TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'layerCsSidebar',
          position: 'left',
          label: 'レイヤー C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'layerTsSidebar',
          position: 'left',
          label: 'レイヤー TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hexCsSidebar',
          position: 'left',
          label: 'ヘキサゴナル C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hexTsSidebar',
          position: 'left',
          label: 'ヘキサゴナル TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'errModelCsSidebar',
          position: 'left',
          label: 'エラーモデリング C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'errModelTsSidebar',
          position: 'left',
          label: 'エラーモデリング TS版',
        },

        {
          type: 'docSidebar',
          sidebarId: 'observerCsSidebar',
          position: 'left',
          label: 'Observer C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'observerTsSidebar',
          position: 'left',
          label: 'Observer TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cleanCsSidebar',
          position: 'left',
          label: 'クリーンアーキ C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cleanTsSidebar',
          position: 'left',
          label: 'クリーンアーキ TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cqsCsSidebar',
          position: 'left',
          label: 'CQS C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cqsTsSidebar',
          position: 'left',
          label: 'CQS TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cqrsCsSidebar',
          position: 'left',
          label: 'CQRS C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cqrsTsSidebar',
          position: 'left',
          label: 'CQRS TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'invariantsCsSidebar',
          position: 'left',
          label: '不変条件 C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'invariantsTsSidebar',
          position: 'left',
          label: '不変条件 TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'svbcCsSidebar',
          position: 'left',
          label: 'SemVer C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'svbcTsSidebar',
          position: 'left',
          label: 'SemVer TS版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'stateMachineCsSidebar',
          position: 'left',
          label: '状態機械 C#版',
        },
        {
          type: 'docSidebar',
          sidebarId: 'stateMachineTsSidebar',
          position: 'left',
          label: '状態機械 TS版',
        },

        {
          href: 'https://github.com/komiyamma/site-docusaurus-software-architecture-cs-study',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} komiyamma, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
