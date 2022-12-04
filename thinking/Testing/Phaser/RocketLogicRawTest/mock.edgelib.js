window.EdgeInternals = {
    _on_updateGuidance: function(name, hitPoints) {
        console.log('EdgeInternals:_on_updateGuidance', name, hitPoints);
    },
    _on_updateObjective: function(name, progressPoints) {
        console.log('EdgeInternals:_on_updateObjective', name, progressPoints);
    },
    _on_gameCompleted: function(message, data) {
        console.log('EdgeInternals:_on_gameCompleted', message, data);
    }
}