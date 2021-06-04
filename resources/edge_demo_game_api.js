/**
 * Developed for Edge GbLP - MIT 3201 Project
 */
 const edge = {
    url: 'http://localhost:80/edge-api/objectiveUpdate',
    progress: {
        asteroids: 0,
        enemies: 0,
        flight: 0
    },
    sendObjectiveUpdate: function(objective, progress){
        const data = {
            "userId":8, // Hardcoded User ID
            "sessionId":1, // Hardcoded Session ID
            "objectiveId":objective,
            "progress":progress
        };
        fetch(edge.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },
    sendHealthAtEnd: function(currentHealth){
        edge.sendObjectiveUpdate('1', currentHealth);
    },
    sendAsteroidDestroyed: function(){
        edge.progress.asteroids += 1.0;
        edge.sendObjectiveUpdate('2', edge.progress.asteroids);
    },
    sendEnemyDestroyed: function(){
        edge.progress.enemies += 1.0;
        edge.sendObjectiveUpdate('3', edge.progress.enemies);
    },
    sendFlightOccured: function(){
        edge.progress.flight += 0.1;
        edge.sendObjectiveUpdate('4', edge.progress.flight);
    }
}