import { useEffect, useState } from "react";

function SportChannels() {
  // Déclaration des états
  const [channels, setChannels] = useState([]); // État pour stocker les données des chaînes sportives
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement

  useEffect(() => {
    // Fonction pour récupérer les données des chaînes sportives depuis l'API
    async function fetchChannels() {
      try {
        // Effectue une requête HTTP GET pour récupérer les données
        const response = await fetch('http://localhost:3000/api/sports-channels');

        // Vérifie si la réponse de la requête est ok
        if (!response.ok) {
          throw new Error('Échec de la récupération des données');
        }

        // Convertit la réponse en format JSON
        const data = await response.json();

        // Met à jour l'état channels avec les données récupérées
        setChannels(data);

        // Met à jour l'état loading à false pour indiquer que le chargement est terminé
        setLoading(false);
      } catch (error) {
        // Si une erreur se produit lors de la récupération des données, gère l'erreur
        console.error("Erreur lors de la récupération de données");
        setError(error);

        // Met à jour l'état loading à false pour indiquer que le chargement est terminé
        setLoading(false);
      }
    }

    // Appelle la fonction fetchChannels lors du montage du composant
    fetchChannels();
  }, []);

  return (
    <div>
      {/* Affiche un message d'erreur si une erreur s'est produite lors de la récupération des données */}
      {error ? (
        <div>Erreur: {error.message} </div>
      ) :
        /* Affiche un message de chargement si les données sont en cours de chargement */
        loading ? (
          <div>Chargement en cours...</div>
        ) : (
          /* Affiche la liste des chaînes sportives si les données ont été récupérées avec succès */
          <div>
            <h1>List Sport channels</h1>
            <ul>
              {/* Parcourt le tableau channels et affiche chaque chaîne sportive */}
              {channels.map(channel => (
                <li key={channel.id}>
                  <img src={channel.imageUrl} width={200} height="auto" alt={channel.name} />
                  <h2> {channel.name} </h2>
                  <p> {channel.description} </p>
                  <input type="url" value={channel.streamUrl} />
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default SportChannels;
