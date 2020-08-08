import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';
import Welcome from '@components/Welcome';
import BooksPreview from '@components/BooksPreview';

const IndexPage = () => (
   <Layout>
      <Welcome>
         <h1>Hey, Matthieu.</h1>
         <p>It looks like you've already started writing a story, keep up the good work.</p>
      </Welcome>
      <BooksPreview
         booksInfos={[
            {
               title: 'Book 1',
               summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
            {
               title: 'Book 2',
               summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
            {
               title: 'Book 3',
               summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
            {
               title: 'Book 4',
               summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
         ]}
      />
   </Layout>
);

export default IndexPage;
