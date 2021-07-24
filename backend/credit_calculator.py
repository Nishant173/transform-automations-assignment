from typing import Union
import numpy as np
import pandas as pd


def get_avg_credit_period(df_ledger_data: pd.DataFrame) -> Union[int, float]:
    """Takes in Ledger data having the columns ['Date', 'Amount', 'Type of transaction'], and returns the average credit period (in days)"""
    df_ledger = df_ledger_data.copy(deep=True)
    df_ledger = df_ledger.loc[:, ['Date', 'Amount', 'Type of transaction']]
    df_ledger.sort_values(by=['Date'], ascending=[True], ignore_index=True, inplace=True)
    payment_dates = df_ledger[df_ledger['Type of transaction'] == 'Payment']['Date'].tolist()
    purchase_dates = df_ledger[df_ledger['Type of transaction'] == 'Purchase']['Date'].tolist()
    credit_periods_in_days = []
    for payment_date in payment_dates:
        purchase_dates_before_this_payment = list(
            filter(lambda dt_obj_purchase: dt_obj_purchase <= payment_date, purchase_dates)
        )
        purchase_date_for_payment = max(purchase_dates_before_this_payment) if purchase_dates_before_this_payment else None
        if purchase_date_for_payment is not None:
            date_difference_in_days = (payment_date - purchase_date_for_payment).days
            credit_periods_in_days.append(date_difference_in_days)
    avg_credit_period = np.mean(credit_periods_in_days)
    return avg_credit_period


if __name__ == "__main__":
    df_ledger_data = pd.read_excel("Payment data.xlsx", engine='openpyxl')
    avg_credit_period = get_avg_credit_period(df_ledger_data=df_ledger_data)
    print(f"Average credit period (in days): {avg_credit_period}")