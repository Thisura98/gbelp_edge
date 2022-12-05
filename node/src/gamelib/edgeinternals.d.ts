import { IEdgeInternalsFromAngular, IEdgeInternalsFromGame } from "../../../commons/src/models/play/edgeinternals.interface";

declare global{
    interface Window { 
        /**
         * EdgeInternals defined at PlayService in the angular module
         */
        InternalsFromAngular: IEdgeInternalsFromAngular,

        /**
         * EdgeInternals defined from each game and can be accessed by window.InternalsFromGame
         */
        InternalsFromGame: IEdgeInternalsFromGame
    }
}