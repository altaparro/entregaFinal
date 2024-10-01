import { Router } from 'express';
import { renderHome, renderRealTimeProducts, renderProducts, renderProductDetails, renderCart, renderRegister, renderLogin, renderProfile } from '../controllers/viewController.js';
import { onlyAdmin, onlyUser } from '../middleware/auth.js';
const router = Router();

router.get("/", renderHome);
router.get('/api/sessions/realtimeproducts', renderRealTimeProducts);
router.get("/api/sessions/products", onlyUser, renderProducts);
router.get("/products/:pid", renderProductDetails);
router.get("cart/:cid", renderCart);
router.get("/api/sessions/register", renderRegister);
router.get("/api/sessions/login", renderLogin);
router.get("/api/sessions/profile", renderProfile);

export default router;