export interface ITranslation {
    loadingText: string;
    goBackToHome: string;
    goBackToHomeToolTip: string;
    cardDetails: string;
    tableText: ITableTranslation;
    testPage: ITestPageTranslations;
}

interface ITableTranslation {
    edit: string;
    remove: string;
}

interface ITestPageTranslations {
    langButton: string;
}
