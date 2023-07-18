import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { PgPersonaYammerCommunitiesAcePropertyPane } from './PgPersonaYammerCommunitiesAcePropertyPane';
import { AadTokenProvider } from '@microsoft/sp-http';
import {
  getGroups
} from './yammer/pgYammer.service';

export interface IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionProps {
  title: string;
 
}

export interface IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionState {
  CommunitiesDetails: any[];
}

const CARD_VIEW_REGISTRY_ID: string = 'PgPersonaYammerCommunitiesAce_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'PgPersonaYammerCommunitiesAce_QUICK_VIEW';

export default class PgPersonaYammerCommunitiesAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionProps,
  IPgPersonaYammerCommunitiesAceAdaptiveCardExtensionState
> {

  private _deferredPropertyPane: PgPersonaYammerCommunitiesAcePropertyPane | undefined;
  public aadToken: string = "";
  props: any;
// oninit method to get access token of yammer.com.
  public async onInit(): Promise<void> {
 const tokenProvider: AadTokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
    await tokenProvider.getToken("https://api.yammer.com").then(token => {
      this.aadToken = token;
    }).catch(err => console.log(err));
    
    this.state = {
      CommunitiesDetails:[]
     };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    let results :any = [];

    await getGroups(this.context,this.aadToken).then((communitiesResult:any) => {

      if (communitiesResult.data.group_memberships) {
        for (let i: number = 0; i < communitiesResult.data.group_memberships.length; i++) {
            let getmycommunities = {
                weburl: communitiesResult.data.group_memberships[i].web_url,
                Fullname: communitiesResult.data.group_memberships[i].full_name,
                headerimageurl:   communitiesResult.data.group_memberships[i].header_image_url,
                Totalmembers: communitiesResult.data.group_memberships[i].members.toString(),
                privacy: communitiesResult.data.group_memberships[i].privacy
              };
              results.push(getmycommunities);
        }
        console.log(results);
       this.setState({CommunitiesDetails: results});
      }
    }).catch((err:any) => {
      console.log(err);
    });

    return Promise.resolve();
  }

// protected getYammerGroups=async()=>{


// }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'PgPersonaYammerCommunitiesAce-property-pane'*/
      './PgPersonaYammerCommunitiesAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.PgPersonaYammerCommunitiesAcePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
