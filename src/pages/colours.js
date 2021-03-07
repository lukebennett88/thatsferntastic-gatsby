import * as React from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';
import { Layout, SEO } from '../components';

const fullConfig = resolveConfig(tailwindConfig);

function ColoursPage() {
  const { colors } = fullConfig.theme;
  const colorArray = [
    { title: 'Yellow', colours: colors.yellow },
    { title: 'Green', colours: colors.green },
    { title: 'Teal', colours: colors.teal },
    { title: 'Cyan', colours: colors.cyan },
    { title: 'Blue', colours: colors.blue },
    { title: 'Indigo', colours: colors.indigo },
    { title: 'Purple', colours: colors.purple },
    { title: 'Pink', colours: colors.pink },
    { title: 'Red', colours: colors.red },
    { title: 'Gray', colours: colors.gray },
  ];
  return (
    <Layout hasSidebar={false}>
      <SEO title="Colour Palette" />
      <div>
        <ul className="grid gap-8">
          {colorArray.map((color, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <h2
                style={{ color: color.colours[700] }}
                className="font-mono text-xl"
              >
                {color.title}
              </h2>
              <ul className="grid grid-cols-5 gap-4">
                {Object.values(color.colours).map((c) => (
                  <li>
                    <div style={{ backgroundColor: c }} className="h-12" />
                    <div>{c}</div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default ColoursPage;
