const billUsageConfig = {
  PREPAID_CONFIG: {
    MINIMUM_DAYS_ALERT: 7
  },
  PRODUCT_TYPE: {
    TRUEMOVEH: 'TrueMoveH',
    TRUEONLINE: 'TrueOnline',
    TRUEVISION: 'TrueVision'
  },
  PRODUCT_STATUS: {
    ACTIVE: 'ACTIVE',
    SUSPEND: 'SUSPEND',
    CANCEL: 'CANCEL'
  },
  QUOTA_TYPE: {
    DATA: 'DATA',
    VOICE: 'VOICE',
    WIFI: 'WIFI',
    SMS: 'SMS',
    SOCIAL: 'SOCIAL',
    CURRENCY: 'CURRENCY'
  },
  QUOTA_VALUE: {
    UNLIMITED: 'Unlimited',
    MINUTES: 'Minutes'
  },
  TOL_SPEED_TYPES: {
    DOWNLOAD: 'BILLS_USAGE__DOWNLOAD',
    UPLOAD: 'BILLS_USAGE__UPLOAD'
  },
  TVS_CHANNEL_TYPES: {
    HDCHANNELS: 'BILLS_USAGE_TV_HDCHANNEL',
    CHANNELS: 'BILLS_USAGE_CHANNEL'
  },
  DATA_SIZES: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
  ICON_MAP: {
    VOICE: {
      titleText: 'BILLS_USAGE_VOICE',
      titleIconPath: 'icon_voice'
    },
    DATA: {
      titleText: 'BILLS_USAGE_DATA',
      titleIconPath: 'icon_data'
    },
    DOWNLOAD: {
      titleText: 'BILLS_USAGE_TOL_DOWNLOADSPEED',
      titleIconPath: 'icon_download'
    },
    UPLOAD: {
      titleText: 'BILLS_USAGE_TOL_UPLOADSPEED',
      titleIconPath: 'icon_upload'
    },
    WIFI: {
      titleText: 'BILLS_USAGE_WIFI',
      titleIconPath: 'icon_wifi'
    },
    wifiRouter: {
      titleText: 'BILLS_USAGE_TOL_FREE_WIFI_ROUTER',
      titleIconPath: 'icon_router'
    },
    sms: {
      titleText: 'BILLS_USAGE_SMS_MMS',
      titleIconPath: 'sms'
    },
    HDCHANNELS: {
      titleText: 'BILLS_USAGE_TV_HDCHANNEL',
      titleIconPath: 'HD_Channel'
    },
    CHANNELS: {
      titleText: 'BILLS_USAGE_CHANNEL',
      titleIconPath: 'channel'
    },
    CURRENCY: {
      titleText: 'BILLS_USAGE_CREDIT',
      titleIconPath: 'bitcoin'
    },
    SOCIAL: {
      titleText: 'BILLS_USAGE_SOCIAL_APP',
      titleIconPath: 'icon_social'
    }
  },
  PRODUCT_TABS: {
    CURRENT_USAGE: 0,
    BILL_SUMMARY: 1
  },
  PROGRESS_BAR: {
    DEFAULT_FILL: 5
  }
};

module.exports = {
  ...billUsageConfig
};
