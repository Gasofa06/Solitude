import { AddFooter } from '/javascript/reusable/footer.js';
import { AddNavigationMenu } from '/javascript/reusable/navigation-menu.js';
import { AddLoading } from '/javascript/reusable/loading.js';

async function Main() {
    await AddFooter();
    await AddNavigationMenu();
    await AddLoading();
}

Main();
