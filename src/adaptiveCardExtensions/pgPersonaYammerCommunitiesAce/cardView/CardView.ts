import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
// import * as strings from 'PgPersonaYammerCommunitiesAceAdaptiveCardExtensionStrings';
import { IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionProps, IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../PgPersonaYammerCommunitiesAceAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionProps, IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionState> {
  /**
   * Buttons will not be visible if card size is 'Medium' with Image Card View.
   * It will support up to two buttons for 'Large' card size.
   */
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: "View All",
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IImageCardParameters {
    return {
      primaryText: this.state.CommunitiesDetails.length != 0  ? `You are Associated with `+this.state.CommunitiesDetails.length+ ` Yammer communities. Click on "View All" to explore.` : `You are not Part of any Communities`,
      imageUrl: require('../assets/yammerlogo.png'),
      title: `My Yammer Communities`
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
