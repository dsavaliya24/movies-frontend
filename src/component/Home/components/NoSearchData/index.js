import React from 'react'
import "./NoSearchData.scss"
import NoDataIcon from "../../../../assets/icons/video-play.svg"
import { urlSearchParams } from '../../../../utils';
export default function NoSearchData() {
    const search = urlSearchParams("search");
    return (
        <div className="no-search-data-section">
            <div className="no-search-icon-alignment">
                <img src={NoDataIcon} alt="NoDataIcon" />
            </div>

            <h6>No Result found for {search}</h6>
            <p>Please try searching again with another keyword</p>
        </div>
    )
}
