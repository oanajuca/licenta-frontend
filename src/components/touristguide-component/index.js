import './style.css';
import { DiscoverIcon,PromoteIcon,CampingIcon, FireIcon,DeviationIcon,NoiseIcon,EnvironmentIcon,RulesIcon,GarbageIcon } from './icons';
import  PaperIcon  from './icons.svg';
import CardComponent from '../card-component';

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
    <div className="cardul1">
      <CardComponent>
      <p className="rulenumber">1</p>
      <div className="guide_description">
            <i className="guide_icons">{DiscoverIcon}</i>
          <div className="inputs">
             {discover}
             </div>
          </div>
          
      </CardComponent>
                 </div>
       

<div className="cardul2">
<CardComponent>
<p className="rulenumber">2</p>
          <div className="guide_description">
            <i className="guide_icons">{PromoteIcon}</i>
          <div className="inputs">
             {promote}
             </div>
          </div>
          </CardComponent>
</div>

<div className="cardul3">
  <CardComponent>
  <p className="rulenumber">3</p>
          <div className="guide_description">
            <i className="guide_icons">{CampingIcon}</i>
          <div className="inputs">
             {camping}
             </div>
          </div>
          </CardComponent>
          </div>
          </div>
          <div className="row2">
          <div className="cardul4">
            <CardComponent>
            <p className="rulenumber">4</p>
          <div className="guide_description">
            <i className="guide_icons">{FireIcon}</i>
          <div className="inputs">
             {fire}
             </div>
          </div>
          </CardComponent>
</div>
<div className="cardul5">
  <CardComponent>
  <p className="rulenumber">5</p>
          <div className="guide_description">
            <i className="guide_icons">{DeviationIcon}</i>
          <div className="inputs">
             {deviation}
             </div>
          </div>
          </CardComponent>
</div>
<div className="cardul6">
  <CardComponent>
  <p className="rulenumber">6</p>
          <div className="guide_description">
            <i className="guide_icons">{NoiseIcon}</i>
          <div className="inputs">
             {noise}
             </div>
          </div>
          </CardComponent>
          </div>
          </div>
          <div className="row3">
          <div className="cardul7">
            <CardComponent>
            <p className="rulenumber">7</p>
          <div className="guide_description">
            <i className="guide_icons">{EnvironmentIcon}</i>
          <div className="inputs">
             {environment}
             </div>
          </div>
          </CardComponent>
          </div>
          <div className="cardul8">
<CardComponent>
<p className="rulenumber">8</p>
          <div className="guide_description">
            <i className="guide_icons">{RulesIcon}</i>
          <div className="inputs">
             {rules}
             </div>
          </div>
          </CardComponent>
</div>
<div className="cardul9">
  <CardComponent>
  <p className="rulenumber">9</p>
          <div className="guide_description">
            <i className="guide_icons">{GarbageIcon}</i>
          <div className="inputs">
             {garbage}
             </div>
          </div>
          </CardComponent>
</div>
</div>
          </div>
          </div>

  )
}