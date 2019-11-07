export interface ITranslation {
    loadingText: string;
    goBackToHome: string;
    goBackToHomeToolTip: string;
    tableText: ITableTranslation;
    testPage: ITestPageTranslations;
}

interface ITableTranslation {
    edit: string;
    remove: string;
}

interface ITestPageTranslations {
    langButton: string;
    searchBox: string;
    loadButton: string;
    text: string;
    serviceCallButton1: string;
    serviceCallTooltip1: string;
    serviceCallButton2: string;
    serviceCallTooltip2: string;
    serviceCallButton3: string;
    serviceCallTooltip3: string;
}
