import { GameEvent, CharacterState } from '../../types';
import { EVENT_REGISTRY as originalEvents } from '../../eventRegistry';
import { childhoodEvents } from './childhood';
import { adolescenceEvents } from './adolescence';
import { adulthoodYoungEvents } from './adulthood_young';
import { youngDataPack1AEvents } from './adulthood_young_datapack1_a';
import { youngDataPack1BEvents } from './adulthood_young_datapack1_b';
import { youngDataPack1CEvents } from './adulthood_young_datapack1_c';
import { adulthoodMidEvents } from './adulthood_mid';
import { youngDataPack2AEvents } from './adulthood_mid_datapack2_a';
import { youngDataPack2BEvents } from './adulthood_mid_datapack2_b';
import { youngDataPack2CEvents } from './adulthood_mid_datapack2_c';
import { adulthoodMatureEvents } from './adulthood_mature';
import { seniorLifeEvents } from './seniorLife';
import { adjustStats } from '../../utils';

const rawMasterEventRegistry: GameEvent[] = [
  ...originalEvents,
  ...childhoodEvents,
  ...adolescenceEvents,
  ...adulthoodYoungEvents,
  ...youngDataPack1AEvents,
  ...youngDataPack1BEvents,
  ...youngDataPack1CEvents,
  ...adulthoodMidEvents,
  ...youngDataPack2AEvents,
  ...youngDataPack2BEvents,
  ...youngDataPack2CEvents,
  ...adulthoodMatureEvents,
  ...seniorLifeEvents
];

// Globally enforce choice matrix density to exactly 4 options per event,
// upgrading any 2-choice legacy scenarios proceduraly.
export const masterEventRegistry: GameEvent[] = rawMasterEventRegistry.map((evt) => {
  if (evt.choices.length >= 3) {
    return evt;
  }

  const enhancedChoices = [...evt.choices];
  const cleanTitle = evt.title
    .replace(/🎒|⚡|🤫|🏫|🧩|🏡|👵|👓|🎓|🏫|⏳|🚲|🔮|✨|❤️|🧠|😊|📊/g, "")
    .replace(/\(#\d+\)/g, "")
    .trim()
    .toLowerCase();

  let eventContext = cleanTitle;
  if (eventContext.startsWith("the ")) {
    eventContext = eventContext.substring(4);
  }

  if (evt.category === 'Childhood') {
    enhancedChoices.push(
      {
        choiceText: `Discuss this ${eventContext} situation directly with your family.`,
        outcomeText: `You quietly explained the ${eventContext} trouble to your parents. They gave you warm advice and wrapped you in a cozy blanket, restoring your confidence.`,
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: -10, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You sought family guidance to resolve the ${eventContext}.`);
        }
      },
      {
        choiceText: `Ignore this ${eventContext} and focus on your toy blocks instead.`,
        outcomeText: `You paid no attention to the ${eventContext} and crawled over to stack some wooden bricks. Out of sight, out of mind!`,
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -15, smarts: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You shrugged off the ${eventContext} and played with blocks.`);
        }
      }
    );
  } else if (evt.category === 'School') {
    enhancedChoices.push(
      {
        choiceText: `Discuss the ${eventContext} with a trusted school counselor.`,
        outcomeText: `A school counselor held a quiet discussion to help negotiate the ${eventContext}. A calm, stress-reducing resolution was recorded.`,
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -15, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You resolved the ${eventContext} cleanly with a counselor's help.`);
        }
      },
      {
        choiceText: `Brush off this ${eventContext} and take a peaceful walk on the school track.`,
        outcomeText: `You walked away from the schoolyard noise, taking a pleasant, quiet walk. The drama settled itself.`,
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -20, health: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You cleared your mind on a track walk to ignore the ${eventContext}.`);
        }
      }
    );
  } else {
    // Adulthood / Senior / Special Stages
    enhancedChoices.push(
      {
        choiceText: `Consult an experienced professional advisor regarding the ${eventContext}.`,
        outcomeText: `Your professional advisor assessed the ${eventContext} carefully and outlined a brilliant, stress-relieving way forward.`,
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: -20, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: You hired a consultant regarding the ${eventContext} (-$250).`);
        }
      },
      {
        choiceText: `Step away from the ${eventContext} to focus on your personal sanity.`,
        outcomeText: `You retreated from the scene of the problem, sat in lotus position to engage in deep rhythmic breathing, and let the details clear from your thoughts.`,
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -25, health: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You walked away from the ${eventContext} to focus on your well-being.`);
        }
      }
    );
  }

  return {
    ...evt,
    choices: enhancedChoices
  };
});

