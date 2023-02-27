import { broadbandServiceId, housingSocietyServiceId } from '../../../constants';
import ServiceFrontCommon from '../ServiceFrontCommon';

const HousingSociety = () => {
  return (
   <ServiceFrontCommon serviceId={housingSocietyServiceId} serviceName="housingsociety" title="Housing Society" />
  );
};


export default HousingSociety