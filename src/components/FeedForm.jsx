import React, { useReducer } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

import FormInputGroup from './FormInputGroup';
import './FeedForm.css';

import feedReducer from '../reducers/feedReducer';

import realmData from '../assets/realmData.json';

import iconAlliance from '../assets/alliance_15x15.png';
import iconHorde from '../assets/horde_15x15.png';
import iconFactionBoth from '../assets/faction-both_15x15.png';

import iconDeathKnight from '../assets/death-knight_18x18.png';
import iconDemonHunter from '../assets/demon-hunter_18x18.png';
import iconDruid from '../assets/druid_18x18.png';
import iconHunter from '../assets/hunter_18x18.png';
import iconMage from '../assets/mage_18x18.png';
import iconMonk from '../assets/monk_18x18.png';
import iconPaladin from '../assets/paladin_18x18.png';
import iconPriest from '../assets/priest_18x18.png';
import iconRogue from '../assets/rogue_18x18.png';
import iconShaman from '../assets/shaman_18x18.png';
import iconWarlock from '../assets/warlock_18x18.png';
import iconWarrior from '../assets/warrior_18x18.png';

const regionData = [{ text: 'US', value: 'us' }];

const factionData = [
  { icon: iconFactionBoth, text: 'Both', value: 'both' },
  { icon: iconAlliance, text: 'Alliance', value: 'alliance' },
  { icon: iconHorde, text: 'Horde', value: 'horde' }
];

const classOptionsData = [{ text: 'All', value: 'all' }, { text: 'Specific', value: 'specific' }];

const classData = [
  { icon: iconDeathKnight, text: 'Death Knight', value: 'death-knight' },
  { icon: iconDemonHunter, text: 'Demon Hunter', value: 'demon-hunter' },
  { icon: iconDruid, text: 'Druid', value: 'druid' },
  { icon: iconHunter, text: 'Hunter', value: 'hunter' },
  { icon: iconMage, text: 'Mage', value: 'mage' },
  { icon: iconMonk, text: 'Monk', value: 'monk' },
  { icon: iconPaladin, text: 'Paladin', value: 'paladin' },
  { icon: iconPriest, text: 'Priest', value: 'priest' },
  { icon: iconRogue, text: 'Rogue', value: 'rogue' },
  { icon: iconShaman, text: 'Shaman', value: 'shaman' },
  { icon: iconWarlock, text: 'Warlock', value: 'warlock' },
  { icon: iconWarrior, text: 'Warrior', value: 'warrior' }
];

const iLvlData = [
  { text: 'Any', value: 'any' },
  { text: '410+', value: '410' },
  { text: '420+', value: '420' },
  { text: '430+', value: '430' },
  { text: '440+', value: '440' },
  { text: '445+', value: '445' }
];

const progressionOptionsData = [
  { text: 'Any', value: 'any' },
  { text: 'Specific', value: 'specific' }
];

const progressionDataBoD = [
  { text: 'Any', value: 'any' },
  { text: '1/9+', value: '1' },
  { text: '2/9+', value: '2' },
  { text: '3/9+', value: '3' },
  { text: '4/9+', value: '4' },
  { text: '5/9+', value: '5' },
  { text: '6/9+', value: '6' },
  { text: '7/9+', value: '7' },
  { text: '8/9+', value: '8' },
  { text: '9/9', value: '9' }
];

const progressionDataTEP = [
  { text: 'Any', value: 'any' },
  { text: '1/8+', value: '1' },
  { text: '2/8+', value: '2' },
  { text: '3/8+', value: '3' },
  { text: '4/8+', value: '4' },
  { text: '5/8+', value: '5' },
  { text: '6/8+', value: '6' },
  { text: '7/8+', value: '7' },
  { text: '8/8', value: '8' }
];

const initialState = {
  selectedRegion: 'us',
  selectedRealm: 'any',
  selectedFaction: 'both',
  selectedClassOptions: 'all',
  selectedClasses: [],
  selectedILvl: 'any',
  selectedProgressionOptions: 'any',
  selectedProgressionTEPM: 'any',
  selectedProgressionTEPH: 'any',
  selectedProgressionBoDM: 'any',
  selectedProgressionBoDH: 'any'
};

const generateRandomString = () => {
  const rand = Math.floor(Math.random() * 10);
  let randStr = '';

  for (let i = 0; i < 20 + rand; i += 1) {
    randStr += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randStr;
};

const FeedForm = ({ data = initialState }) => {
  const [state, dispatch] = useReducer(feedReducer, data);

  localStorage.setItem('alertSettings', JSON.stringify(state));

  const handleChange = event => {
    const { target } = event;
    const targetName = target.name;
    const { value } = target;
    let newValue = value;

    if (target.type === 'checkbox') {
      if (target.checked) {
        newValue = state[targetName].concat(value);
      } else {
        newValue = state[targetName].filter(currentValue => {
          return currentValue !== value;
        });
      }
    }

    dispatch({ type: target.dataset.action, value: newValue });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const clientId = '594766529439203332';
    const redirectUri = 'http://localhost:3000';
    const stateParameter = generateRandomString();
    localStorage.setItem('stateParameter', stateParameter);

    const discordUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=webhook.incoming&state=${encodeURIComponent(btoa(stateParameter))}`;

    window.location.href = discordUrl;
  };

  return (
    <div className="feed">
      <div className="title__container">
        <h2 className="title__title">Raider LFR Alert Settings:</h2>
      </div>
      <div className="content__container">
        <Form onSubmit={handleSubmit}>
          <FormInputGroup
            compareValue={state.selectedRegion}
            dataList={regionData}
            label="Region:"
            name="selectedRegion"
            action="selectRegion"
            onChange={handleChange}
            type="radio"
          />
          <Row className="form-input-group">
            <Col sm={3}>
              <label>Realm:</label>
            </Col>
            <Col sm={9}>
              <select
                value={state.selectedRealm}
                onChange={handleChange}
                name="selectedRealm"
                data-action="selectRealm"
                className="form-dropdown"
              >
                {realmData[state.selectedRegion]
                  .sort((a, b) => {
                    return ('' + a.name).localeCompare(b.name);
                  })
                  .map(realm => (
                    <option key={realm.slug} value={realm.slug}>
                      {realm.name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <FormInputGroup
            compareValue={state.selectedFaction}
            dataList={factionData}
            label="Faction:"
            name="selectedFaction"
            action="selectFaction"
            onChange={handleChange}
            type="radio"
          />
          <FormInputGroup
            compareValue={state.selectedClassOptions}
            dataList={classOptionsData}
            label="Classes:"
            name="selectedClassOptions"
            action="selectClassOptions"
            onChange={handleChange}
            type="radio"
          />
          {state.selectedClassOptions === 'specific' && (
            <FormInputGroup
              compareValue={state.selectedClasses}
              dataList={classData}
              name="selectedClasses"
              action="selectClasses"
              onChange={handleChange}
              type="checkbox"
            />
          )}
          <FormInputGroup
            compareValue={state.selectedILvl}
            dataList={iLvlData}
            label="iLvl:"
            name="selectedILvl"
            action="selectILvl"
            onChange={handleChange}
            type="radio"
          />
          <FormInputGroup
            compareValue={state.selectedProgressionOptions}
            dataList={progressionOptionsData}
            label="Progression:"
            name="selectedProgressionOptions"
            action="selectProgressionOptions"
            onChange={handleChange}
            type="radio"
          />
          {state.selectedProgressionOptions === 'specific' && (
            <>
              <FormInputGroup
                compareValue={state.selectedProgressionTEPM}
                dataList={progressionDataTEP}
                label="Eternal Palace (M):"
                name="selectedProgressionTEPM"
                action="selectProgressionTEPM"
                onChange={handleChange}
                type="radio"
              />
              <FormInputGroup
                compareValue={state.selectedProgressionTEPH}
                dataList={progressionDataTEP}
                label="Eternal Palace (H):"
                name="selectedProgressionTEPH"
                action="selectProgressionTEPH"
                onChange={handleChange}
                type="radio"
              />
              <FormInputGroup
                compareValue={state.selectedProgressionBoDM}
                dataList={progressionDataBoD}
                label="BoD (M):"
                name="selectedProgressionBoDM"
                action="selectProgressionBoDM"
                onChange={handleChange}
                type="radio"
              />
              <FormInputGroup
                compareValue={state.selectedProgressionBoDH}
                dataList={progressionDataBoD}
                label="BoD (H):"
                name="selectedProgressionBoDH"
                action="selectProgressionBoDH"
                onChange={handleChange}
                type="radio"
              />
            </>
          )}
          <Button type="submit">Save</Button>
        </Form>
      </div>
    </div>
  );
};

export default FeedForm;
