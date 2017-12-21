// **********************
// TO BE DELETED: only added for layout creation of bills and usage
//* **********************
import {colors} from '../../themes/constants.styles';

export const availablePackage = [{
  label: '20',
  value: '20'
}, {
  label: '50',
  value: '50'
}, {
  label: '100',
  value: '100'
}, {
  label: '',
  value: 'more'
}];

export const postpaidData = [{
  iconSectionColor: colors.SECONDARY_TMOVE,
  leftTitleText: '081-257-7887',
  leftDetailText: 'True Mobile',
  amountText: 3000,
  dueBills: [
    {
      'bill_date': '2017-10-03',
      'bill_due_date': '2017-11-03',
      'bill_amount': 1000.123
    },
    {
      'bill_date': '2017-11-03',
      'bill_due_date': '2017-09-03',
      'bill_amount': 2000
    }
  ]
}, {
  iconSectionColor: colors.SECONDARY_TONLINE,
  leftTitleText: '081-257-7887',
  leftDetailText: 'True Mobile',
  amountText: 1500,
  currentUsage: [{
    usage: 50,
    unit: 'MB',
    type: 'Download'
  }, {
    usage: 5,
    unit: 'MB',
    type: 'Upload'
  }],
  dueBills: [
    {
      'bill_date': '2017-10-03',
      'bill_due_date': '2017-09-03',
      'bill_amount': 1000
    },
    {
      'bill_date': '2017-11-03',
      'bill_due_date': '2017-09-03',
      'bill_amount': 500
    }
  ]
}, {
  iconSectionColor: colors.SECONDARY_TVISION,
  leftTitleText: '081-257-7887',
  leftDetailText: 'True Mobile',
  amountText: 799,
  currentUsage: [{
    usage: 64,
    type: 'HD Channels'
  }, {
    usage: 170,
    type: 'Channels'
  }],
  dueBills: [
    {
      'bill_date': '2017-10-03',
      'bill_due_date': '2017-09-03',
      'bill_amount': 1000
    },
    {
      'bill_date': '2017-11-03',
      'bill_due_date': '2017-09-03',
      'bill_amount': 500
    }
  ]
}];

export const prepaidData = [{
  iconSectionColor: colors.SECONDARY_TMOVE,
  leftTitleText: '081-257-7887',
  leftDetailText: 'True Mobile',
  rightTitleText: 'value',
  amountText: 5
}, {
  iconSectionColor: colors.SECONDARY_TMOVE,
  leftTitleText: '081-257-7887',
  leftDetailText: 'True Mobile',
  rightTitleText: 'value',
  amountText: 15
}];

export const billDetail = {
  invoiceNumber: '0000-0000-0000',
  total: 1250,
  creditLimit: 2500,
  exceedUsage: 40.35,
  voice: {
    consumedValue: 250,
    unit: 'min',
    subtext: 'of 300 min'
  },
  data: {
    consumedValue: 10,
    unit: 'GB',
    subtext: 'of 30 GB'
  }
};

export const packageDetailExtra = {
  phoneNumber: '081-257-7887',
  packageDetail: {
    productType: 'ทรูมูฟเอช',
    phoneNumber: '0812577887',
    endMonth: 'ทุกวันที่',
    endDate: '2017-12-15T00:00:00.000+07:00',
    title: 'Postpaid: 4G Super Smart 599',
    subtitle: 'รับส่วนลดค่าบริการ 50%  12 รอบบิล (ก.ย.59 - ส.ค.60)',
    creditLimit: '2,500',
    exceedUsage: '40.35',
    items: {
      voice: {
        consumedValue: '300',
        subtext: 'Over charge 1.50 B/min',
        unit: 'min'
      },
      data: {
        consumedValue: '10',
        subtext: '300 Mbps max speed',
        unit: 'GB'
      },
      wifi: {
        consumedValue: 'Unlimited',
        subtext: '',
        unit: ''
      },
      sms: {
        consumedValue: '3',
        subtext: 'Per message',
        unit: 'Baht'
      }
    }
  },
  extraPackage: [{
    title: 'Voice',
    subtitle: '(Main)1',
    consumedValue: '100',
    totalValue: '300',
    expiryDate: '2018-10-05T01:43:47.421Z',
    unit: 'min',
    isActive: true
  }, {
    title: 'Voice',
    subtitle: '(Main)2',
    consumedValue: '240',
    totalValue: '300',
    unit: 'min',
    isActive: true
  }, {
    title: 'Voice',
    subtitle: '(Main)3',
    consumedValue: '0',
    totalValue: '300',
    expiryDate: '2019-10-05T01:43:47.421Z',
    unit: 'min',
    isActive: false
  }, {
    title: 'Voice',
    subtitle: '(Main)4',
    consumedValue: '0',
    totalValue: '300',
    expiryDate: '2019-10-05T01:43:47.421Z',
    unit: 'min',
    isActive: false
  }],
  autoRenew: {
    isEnabled: 'true',
    paymentMode: 'CC',
    paymentDetail: '4522 XXXX XXXX 1867'
  }
};

export const TConvergencePackageDetailData = {
  TOLPackageDetails: {
    endMonth: 'may',
    endDate: '2017-12-15T00:00:00.000+07:00',
    planOverView: 'Ultra hi-speed Internet 50M  2,799',
    planOffer: 'รับส่วนลดค่าบริการ 50%  12 รอบบิล (ก.ย.59 - ส.ค.60)',
    download: {
      consumedValue: '50', unit: 'MB'},
    upload: {
      consumedValue: '5', unit: 'MB'},
    wifi: {
      consumedValue: '30', subtext: 'hrs / month'
    },
    wifiRouter: {
      subtext: '12 months contract'
    }
  },
  TMPackageDetails: {
    phoneNumber: '081-257-7887',
    packageDetail: {
      productType: 'ทรูมูฟเอช',
      phoneNumber: '0812577887',
      endMonth: 'ทุกวันที่',
      endDate: '2017-12-15T00:00:00.000+07:00',
      title: 'Postpaid: 4G Super Smart 599',
      subtitle: 'รับส่วนลดค่าบริการ 50%  12 รอบบิล (ก.ย.59 - ส.ค.60)',
      creditLimit: '2,500',
      exceedUsage: '40.35',
      items: {
        voice: {
          consumedValue: '300',
          subtext: 'Over charge 1.50 B/min',
          unit: 'min'
        },
        data: {
          consumedValue: '10',
          subtext: '300 Mbps max speed',
          unit: 'GB'
        },
        wifi: {
          consumedValue: 'Unlimited',
          subtext: '',
          unit: ''
        },
        sms: {
          consumedValue: '3',
          subtext: 'Per message',
          unit: 'Baht'
        }
      }
    }
  },
  TVPackageDetails: {
    endMonth: 'may',
    endDate: '2017-12-15T00:00:00.000+07:00',
    planOverView: 'Gold',
    planOffer: 'รับส่วนลดค่าบริการ 50%  12 รอบบิล (ก.ย.59 - ส.ค.60)',
    hdChannel: {
      consumedValue: '64'
    },
    channel: {
      consumedValue: '170'
    },
    additionalOffers: [
      {
        titleText: 'FREE! Super Soccer',
        consumedValue: 2,
        subtext: 'Seasons'
      },
      {
        titleText: 'FREE Installation',
        subtext: '12 Months contract'
      }
    ]
  },
  userDetails: {
    name: 'test',
    phoneNumber: '9629770174'
  },
  billCycle: {
    code: '10'
  }
};
