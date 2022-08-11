import { IEdgeInternals } from "../../../commons/src/models/play/edgeinternals.interface";

declare global{
    interface Window { 
        /**
         * EdgeInternals defined at PlayService in the angular module
         */
        EdgeInternals: IEdgeInternals
    }
}