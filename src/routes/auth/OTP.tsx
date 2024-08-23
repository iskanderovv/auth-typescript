import { Button, Input } from 'antd';
import { GetProps } from 'react-redux';

type OTPProps = GetProps<typeof Input.OTP>;

type OTPProp = {
  onSubmit: () => void;
  isLoading: boolean;
  onNext: () => void;
};

const OTP: React.FC<OTPProp> = ({ onSubmit, isLoading, onNext }) => {
  const handleSubmit = () => {
    onSubmit();
    onNext();
  };

  const onChange: OTPProps['onChange'] = (text: string) => {
    console.log('onChange:', text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className='flex flex-col max-w-[400px] w-full gap-4 justify-center items-center'>
      <h2 className="text-3xl mb-5">Verify Email</h2>
      <Input.OTP length={6} {...sharedProps} />
      <Button type="primary" size="large" className='w-full' onClick={handleSubmit} loading={isLoading}>
        Verify
      </Button>
      </div>
    </div>
  );
};

export default OTP;
