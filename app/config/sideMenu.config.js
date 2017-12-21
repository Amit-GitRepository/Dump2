export const menuConfig = [
  {
    title: 'SIDE_MENU__EASY_PAY',
    nodes: [{
      title: 'SIDE_MENU__BILLS_USAGE',
      screen: 'BillUsage',
      icon: 'bitcoin'
    }, {
      title: 'SIDE_MENU__BUY_EXTRA_PACKAGE',
      screen: 'BuyExtraPackage',
      icon: 'buy-extra',
      disabled: true
    }, {
      title: 'SIDE_MENU__TOP_UP',
      screen: 'TopUp',
      icon: 'top-up'
    }, {
      title: 'SIDE_MENU__CHANGE_PACKAGE',
      screen: 'ChangePackage',
      icon: 'change-package',
      disabled: true
    }, {
      title: 'SIDE_MENU__PAY_OTHER',
      screen: 'PayForOthers',
      icon: 'pay-for-others'
    }]
  }, {
    title: 'SIDE_MENU__SETTING_HISTORY',
    nodes: [{
      title: 'SIDE_MENU__ACCOUNT_SETTINGS',
      screen: 'AccountSettings',
      icon: 'settings',
      nodes: [/* {
        title: 'SIDE_MENU__PERSONAL_INFO',
        screen: 'PersonalInfo'
      },*/ {
          title: 'SIDE_MENU__BILLING_METHODS',
          screen: 'BillingMethods'
        } /* {
        title: 'SIDE_MENU__REMOVE_CREDIT_CARD',
        screen: 'BillUsage'
      }, {
        title: 'SIDE_MENU__AUTO_PAY',
        screen: 'BillUsage'
      }, {
        title: 'SIDE_MENU__BUDGET_CONTROL',
        screen: 'BillUsage'
      }, {
        title: 'SIDE_MENU__MANAGE_SERVICES',
        screen: 'BillUsage'
      }, {
        title: 'SIDE_MENU__NOTIFICATION_SETTINGS',
        screen: 'BillUsage'
      } */]
    }, {
      title: 'SIDE_MENU__BILLING_PAYMENT_HISTORY',
      screen: 'PaymentHistory',
      icon: 'payment-history',
      nodes: [{
        title: 'SIDE_MENU__PAYMENT_HISTORY',
        screen: 'PaymentHistory',
        disabled: true
      }, {
        title: 'SIDE_MENU__BILLING_HISTORY',
        screen: 'BillingHistory',
        disabled: true
      }, {
        title: 'SIDE_MENU__USAGE_HISTORY',
        screen: 'UsageHistory',
        disabled: true
      }]
    }
    ]
  }, {
    title: 'SIDE_MENU__HELP_SUPPORT',
    nodes: [{
      title: 'SIDE_MENU__TRUE_SHOP',
      screen: 'StoreLocator',
      icon: 'true-shop-location'
    }, /* {
      title: 'SIDE_MENU__COVERAGE',
      screen: 'Coverage',
      icon: '4g-wifi'
    }, */ {
      title: 'SIDE_MENU_CARE_CHAT',
      screen: 'TrueCareChat',
      icon: 'true-chat',
      disabled: true
    }
    ]
  }
];
