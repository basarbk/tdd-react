import { activate } from '../api/apiCalls';
import { useEffect, useState } from 'react';

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

  let content = <span className="spinner-border" role="status"></span>;
  if (result === 'success') {
    content = (
      <div className="alert alert-success mt-3">Account is activated</div>
    );
  } else if (result === 'fail') {
    content = <div className="alert alert-danger mt-3">Activation failure</div>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

export default AccountActivationPage;
