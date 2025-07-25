import { Cl, cvToValue } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const PLEDGE_CONTRACT = "pledge-for-action";

describe("Pledge for Action Contract", () => {
  const accounts = simnet.getAccounts();
  const deployer = accounts.get("deployer")!;
  const wallet1 = accounts.get("wallet_1")!;
  const wallet2 = accounts.get("wallet_2")!;

  it("allows users to make a pledge and increments the pledge count", () => {
    // Check initial pledge count
    let count = simnet.callReadOnlyFn(
      PLEDGE_CONTRACT,
      "get-pledge-count",
      [],
      deployer
    );
    expect(count.result).toBeOk(Cl.uint(0));

    // Wallet 1 makes a pledge
    const pledge1Message = "I pledge to plant a tree this month.";
    const tx1 = simnet.callPublicFn(
      PLEDGE_CONTRACT,
      "make-pledge",
      [Cl.stringUtf8(pledge1Message)],
      wallet1
    );
    expect(tx1.result).toBeOk(Cl.uint(1)); // Returns the new pledge ID

    // Wallet 2 makes a pledge
    const pledge2Message = "I pledge to volunteer for 5 hours at the local shelter.";
    const tx2 = simnet.callPublicFn(
      PLEDGE_CONTRACT,
      "make-pledge",
      [Cl.stringUtf8(pledge2Message)],
      wallet2
    );
    expect(tx2.result).toBeOk(Cl.uint(2));

    // Check final pledge count
    count = simnet.callReadOnlyFn(
      PLEDGE_CONTRACT,
      "get-pledge-count",
      [],
      deployer
    );
    expect(count.result).toBeOk(Cl.uint(2));
  });

  it("retrieves pledge details correctly", () => {
    // Wallet 1 makes another pledge in a fresh context
    const pledgeMessage = "I pledge to reduce my plastic usage.";
    const tx = simnet.callPublicFn(
      PLEDGE_CONTRACT,
      "make-pledge",
      [Cl.stringUtf8(pledgeMessage)],
      wallet1
    );
    const pledgeId = cvToValue(tx.result).value;

    // Retrieve the pledge
    const pledge = simnet.callReadOnlyFn(
      PLEDGE_CONTRACT,
      "get-pledge",
      [Cl.uint(pledgeId)],
      deployer
    );

    // The result is an optional tuple, so we expect (some ...)
    expect(pledge.result).toSatisfy((r: any) => r.value.type === "Some");

    const pledgeData = cvToValue(pledge.result).value.data;
    expect(pledgeData.pledger.value).toEqual(wallet1);
    expect(pledgeData.message.data).toEqual(pledgeMessage);
    expect(pledgeData.block.value).toBeGreaterThan(0n);
  });

  it("returns none for a non-existent pledge", () => {
    const pledge = simnet.callReadOnlyFn(
      PLEDGE_CONTRACT,
      "get-pledge",
      [Cl.uint(999)], // A non-existent ID
      deployer
    );
    expect(pledge.result).toBeNone();
  });
});