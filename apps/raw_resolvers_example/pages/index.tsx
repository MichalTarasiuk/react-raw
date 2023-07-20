import {useRaw} from '@react-raw/core';

import type {RawResolvers} from '@react-raw/core';

const headingRawResolvers: RawResolvers = {
  h1: {
    click_me_heading: (children, props) => <h1 {...props}>{children}</h1>,
  },
};

const listingRawResolvers: RawResolvers = {
  item: (children, props) => <li {...props}>{children}</li>,
};

const buttonRawResolvers: RawResolvers = {
  button: (children, props) => (
    <button
      {...props}
      onClick={() => alert('clicked')}>
      {children}
    </button>
  ),
};

function IndexPage() {
  const raw = useRaw();

  return (
    <main>
      {raw(
        '<h1 resolve="click_me_heading">Click me section</h2>',
        headingRawResolvers
      )}
      <section>
        <h2>tutorial:</h2>
        <ul>
          {raw(
            `<item>click 'click me' button</item> <item>alert will show</item>`,
            listingRawResolvers
          )}
        </ul>
      </section>
      {raw('<button>click me</button>', buttonRawResolvers)}
    </main>
  );
}

export default IndexPage;
