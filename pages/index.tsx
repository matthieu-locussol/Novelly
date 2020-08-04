import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';
import Welcome from '@components/Welcome';

const IndexPage = () => (
   <Layout>
      <Welcome>
         <h1>Hey, Matthieu.</h1>
         <p>It looks like you've already started writing a story, keep up the good work.</p>
      </Welcome>
      <Button variant="contained" color="primary">
         Hello world!
      </Button>
   </Layout>
);

export default IndexPage;
