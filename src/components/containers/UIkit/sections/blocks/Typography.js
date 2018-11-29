import React from 'react';

/**
 * This component returns content of UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Typography = () => {
  return (
    <div id="typography" className="ui-section">
      <h2 className="ui-main-title">Typography</h2>
      <div id="headings" className="ui-sub-section">
        <strong className="ui-title">Headings</strong>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </div>
      <div id="paragraphs" className="ui-sub-section">
        <strong className="ui-title">Paragraphs</strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum eligendi, rem, expedita doloremque similique, laudantium quia quae officia nam voluptatum mollitia dolor non reiciendis dignissimos accusantium recusandae maxime inventore.</p>
        <p><strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus delectus provident hic perferendis alias quia assumenda cum beatae, quod quasi autem quisquam optio nostrum eaque! Ea ipsum consequuntur, aspernatur voluptate.</strong></p>
        <p><em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus delectus provident hic perferendis alias quia assumenda cum beatae, quod quasi autem quisquam optio nostrum eaque! Ea ipsum consequuntur, aspernatur voluptate.</em></p>
        <p><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus delectus provident hic perferendis alias quia assumenda cum beatae, quod quasi autem quisquam optio nostrum eaque! Ea ipsum consequuntur, aspernatur voluptate.</a></p>
      </div>
      <div id="lists" className="ui-sub-section">
        <strong className="ui-title">Lists</strong>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <strong className="ui-sub-title">Marked list</strong>
            <ul>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4">
            <strong className="ui-sub-title">Ordered list</strong>
            <ol>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ol>
          </div>
          <div className="col-xs-12 col-sm-4">
            <strong className="ui-sub-title">Cleared list</strong>
            <ul className="list-reset">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
        </div>
     </div>
   </div>
  );
};

export default Typography;
