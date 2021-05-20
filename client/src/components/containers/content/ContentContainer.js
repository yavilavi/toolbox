import { Route } from 'react-router-dom';
import Card from 'react-bootstrap/card';
import Row from 'react-bootstrap/Row';
import TextCreate from '../../text/create/create';
import TextList from '../../text/list/list';
import TextView from '../../text/view';

const ContentContainer = () => (
  <div className="mt-3">
    <Row className="m-2">
      <div className="col-12">
        <Card className="w-100" style={{ height: '78vh' }}>
          <Card.Header>Here&apos;s where the title goes</Card.Header>
          <Route exact path="/" component={TextCreate} />
          <Route exact path="/my-texts" component={TextList} />
          <Route exact path="/view-text/:id" component={TextView} />
        </Card>
      </div>
    </Row>
  </div>
);

export default ContentContainer;
