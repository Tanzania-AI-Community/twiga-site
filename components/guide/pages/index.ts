import type { ComponentType } from "react";

import AddingATool from "./developers/adding-a-tool";
import Architecture from "./developers/architecture";
import ConductAndSecurity from "./developers/conduct-and-security";
import Database from "./developers/database";
import DataModel from "./developers/data-model";
import Deployment from "./developers/deployment";
import Environment from "./developers/environment";
import HowToContribute from "./developers/how-to-contribute";
import LocalSetup from "./developers/local-setup";
import MockWhatsApp from "./developers/mock-whatsapp";
import Monitoring from "./developers/monitoring";
import Testing from "./developers/testing";
import Whatsapp from "./developers/whatsapp";

/**
 * Written pages, keyed by route. The catch-all renders one of these when the
 * path matches and falls back to the placeholder otherwise, so a page can be
 * added to the sidebar before its prose exists.
 *
 * Track index pages are not here. They have their own static routes.
 */
export const guidePageContent: Record<string, ComponentType> = {
  "/guide/developers/getting-started/local-setup": LocalSetup,
  "/guide/developers/getting-started/mock-whatsapp": MockWhatsApp,
  "/guide/developers/getting-started/whatsapp": Whatsapp,
  "/guide/developers/architecture/overview": Architecture,
  "/guide/developers/architecture/data-model": DataModel,
  "/guide/developers/architecture/adding-a-tool": AddingATool,
  "/guide/developers/operations/environment": Environment,
  "/guide/developers/operations/database": Database,
  "/guide/developers/operations/deployment": Deployment,
  "/guide/developers/operations/monitoring": Monitoring,
  "/guide/developers/contributing/how-to-contribute": HowToContribute,
  "/guide/developers/contributing/testing": Testing,
  "/guide/developers/contributing/conduct-and-security": ConductAndSecurity,
};
