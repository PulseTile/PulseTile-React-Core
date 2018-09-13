import React from 'react';
import { getNameFromUrl } from '../../../utils/rss-helpers';
import RssDashboardPanel from '../../theme/plugins/Feeds/RssDashboardPanel';

const FeedsPanel = ({ item, handleGoToState, isHasPreview, isHasList }) => {
            const nameItem = getNameFromUrl(item.landingPageUrl);
            const isShow = ('true' == localStorage.getItem('isShow_'+nameItem));
            return (isShow ?
                <RssDashboardPanel
                    key={nameItem}
                    title={item.name}
                    state={item.landingPageUrl}
                    goToState={handleGoToState}
                    rssFeedName={nameItem}
                    rssFeedUrl={item.rssFeedUrl}
                    isHasPreview={isHasPreview}
                    isHasList={isHasList}
                />
                : null);
};

export default FeedsPanel;