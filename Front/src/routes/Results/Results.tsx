import GetMoreResults from '../../components/GetMoreResults/GetMoreResults';
import GetResults from '../../components/GetResults/GetResults';

function Results() {
  return (
    <div className="container mx-auto p-6">
      {/* Section pour les résultats récents */}
      <section className="bg-blue-900 shadow-lg p-6 rounded-lg mb-6">
        <h2 className="text-2xl text-white font-bold mb-4">
          Résultats récents
        </h2>
        <GetResults />
      </section>

      {/* Section pour les autres résultats */}
      <section className="bg-blue-900 shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl text-white font-bold mb-4">Autres résultats</h2>
        <GetMoreResults />
      </section>
    </div>
  );
}

export default Results;
