import { activate } from '../api/apiCalls';
import { useEffect, useState } from 'react';

const AccountActivationPage = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    activate(props.match.params.token)
      .then(() => {
        setResult('success');
      })
      .catch(() => {
        setResult('fail');
      });
  }, [props.match.params.token]);

  return (
    <div data-testid="activation-page">
      {result === 'success' && (
        <div className="alert alert-success mt-3">Account is activated</div>
      )}
      {result === 'fail' && (
        <div className="alert alert-danger mt-3">Activation failure</div>
      )}
    </div>
  );
};

export default AccountActivationPage;
