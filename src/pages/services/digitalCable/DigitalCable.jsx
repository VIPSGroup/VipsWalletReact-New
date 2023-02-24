import ServiceFrontCommon from '../ServiceFrontCommon';
import { digitalCableServiceId } from '../../../constants';

const DigitalCable = () => {
  return (
   <ServiceFrontCommon serviceId={digitalCableServiceId} serviceName="digitalCable" title="Digital Cable" />
  );
};


export default DigitalCable