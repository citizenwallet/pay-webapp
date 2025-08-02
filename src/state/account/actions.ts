import { useMemo } from "react";
import { AccountState, useAccountStore } from "./state";
import { StoreApi, UseBoundStore } from "zustand";
import { CommunityConfig, Config, LogsService } from "@citizenwallet/sdk";
import { StorageService } from "@/services/storage";
import { CWAccount } from "@/services/account";
import { formatUnits } from "ethers";

export class AccountLogic {
  baseUrl: string;
  state: AccountState;
  config: Config;
  communityConfig: CommunityConfig;

  storage: StorageService;

  logsService: LogsService;

  account?: CWAccount;
  constructor(
    baseUrl: string,
    state: AccountState,
    config: Config,
    accountAddress: string
  ) {
    this.baseUrl = baseUrl;
    this.state = state;
    this.config = config;
    this.communityConfig = new CommunityConfig(config);

    this.storage = new StorageService(config.community.alias);

    this.logsService = new LogsService(this.communityConfig);

    this.state.setAccount(accountAddress);
    this.account = new CWAccount(this.config, accountAddress);
  }

  async fetchBalance(_token?: string) {
    const token = this.communityConfig.getToken(_token);

    try {
      if (!this.account) {
        throw new Error("Account not set");
      }

      const balance = await this.account.getBalance(token.address);

      let formattedBalance = formatUnits(balance, token.decimals);
      if (token.decimals === 0) {
        formattedBalance = parseInt(formattedBalance).toFixed(0);
      } else {
        formattedBalance = parseFloat(formattedBalance).toFixed(2);
      }

      this.state.setBalance(formattedBalance);
    } catch (error) {}
  }

  clear() {
    this.state.clear();
  }
}

export const useAccount = (
  baseUrl: string,
  config: Config,
  accountAddress: string
): [UseBoundStore<StoreApi<AccountState>>, AccountLogic] => {
  const sendStore = useAccountStore;

  const actions = useMemo(
    () =>
      new AccountLogic(baseUrl, sendStore.getState(), config, accountAddress),
    [baseUrl, sendStore, config, accountAddress]
  );

  return [sendStore, actions];
};
