import './style.css';
import { DiscoverIcon,PromoteIcon,CampingIcon, FireIcon,DeviationIcon,NoiseIcon,EnvironmentIcon,RulesIcon,GarbageIcon } from './icons';

export default function TouristGuides({
discover, promote, camping, fire, deviation, noise, environment, rules, garbage
}) {
  return (
    <div>
        <div className="pagetitle">
            <p className="titlu">ADOPTA UN COMPORTAMENT PRIETENOS</p>
        </div>
      <div className="guide_desc">
<div className="row1">
    <div className="allshape">
        <div className="guide_description">
            <i className="guide_icons">{DiscoverIcon}</i>
          <div className="inputs">
             {discover}
             </div>
          </div>
</div>
<div className="allshape">
          <div className="guid_description">
            <i className="guide_icons">{PromoteIcon}</i>
          <div className="inputs">
             {promote}
             </div>
          </div>
</div>
<div className="allshape">
          <div className="guide_description">
            <i className="guide_icons">{CampingIcon}</i>
          <div className="inputs">
             {camping}
             </div>
          </div>
          </div>
          </div>
          <div className="row2">
          <div className="allshape">
          <div className="guide_description">
            <i className="guide_icons">{FireIcon}</i>
          <div className="inputs">
             {fire}
             </div>
          </div>
</div>
<div className="allshape">
          <div className="guid_description">
            <i className="guide_icons">{DeviationIcon}</i>
          <div className="inputs">
             {deviation}
             </div>
          </div>
</div>
<div className="allshape">
          <div className="guide_description">
            <i className="guide_icons">{NoiseIcon}</i>
          <div className="inputs">
             {noise}
             </div>
          </div>
          </div>
          </div>
          <div className="row3">
          <div className="allshape">
          <div className="guide_description">
            <i className="guide_icons">{EnvironmentIcon}</i>
          <div className="inputs">
             {environment}
             </div>
          </div>
          </div>
          <div className="allshape">

          <div className="guide_description">
            <i className="guide_icons">{RulesIcon}</i>
          <div className="inputs">
             {rules}
             </div>
          </div>
</div>
<div className="allshape">
          <div className="guid_description">
            <i className="guide_icons">{GarbageIcon}</i>
          <div className="inputs">
             {garbage}
             </div>
          </div>
</div>
</div>
          </div>
          </div>

  )
}