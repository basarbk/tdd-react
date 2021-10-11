import { activate } from '../api/apiCalls';
import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const AccountActivationPage = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    setResult();
    activate(props.match.params.token)
      .then(() => {
        setResult('success');
      })
      .catch(() => {
        setResult('fail');
      });
  }, [props.match.params.token]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );
  if (result === 'success') {
    content = <Alert>Account is activated</Alert>;
  } else if (result === 'fail') {
    content = <Alert type="danger">Activation failure</Alert>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

export default AccountActivationPage;
