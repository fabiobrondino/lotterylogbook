import CreateNextGame from '../../components/CreateNextGame/CreateNextGame';
import SetResults from '../../components/SetResults/SetResults';

function Administrator() {
  return (
    <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-300">
      <div className="md:w-1/2 p-4">
        <SetResults />
      </div>
      <div className="md:w-1/2 p-4">
        <CreateNextGame />
      </div>
    </div>
  );
}

export default Administrator;
