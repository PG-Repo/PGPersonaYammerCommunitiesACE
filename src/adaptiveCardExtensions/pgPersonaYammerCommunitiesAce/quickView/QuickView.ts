import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
// import * as strings from 'PgPersonaYammerCommunitiesAceAdaptiveCardExtensionStrings';
import { IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionProps, IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionState } from '../PgPersonaYammerCommunitiesAceAdaptiveCardExtension';

export interface IQuickViewData {
  // subTitle: string;
  title: string;
  pgCommunities: any[];
}
// subTitle: strings.SubTitle,
export class QuickView extends BaseAdaptiveCardView<
  IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionProps,
  IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      title: `My Communities`,
      pgCommunities: this.state.CommunitiesDetails
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }

  public onAction(action: IActionArguments): void {
    if (action.type !== 'Submit') { return ;}
  
    
  }
}