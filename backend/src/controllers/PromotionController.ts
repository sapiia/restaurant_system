import { Request, Response } from 'express';
import { PromotionService } from '../services/PromotionService.js';

export class PromotionController {
  private service = new PromotionService();

  getAll = async (_: Request, res: Response) => {
    try {
      const promotions = await this.service.getAllPromotions();
      res.status(200).json({ success: true, data: promotions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getActive = async (_: Request, res: Response) => {
    try {
      const promotions = await this.service.getActivePromotions();
      res.status(200).json({ success: true, data: promotions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const promo = await this.service.getPromotionById(Number(req.params.id));
      if (!promo) {
        res.status(404).json({ success: false, message: 'Promotion not found' });
        return;
      }
      res.status(200).json({ success: true, data: promo });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const promo = await this.service.createPromotion(req.body);
      res.status(201).json({
        success: true,
        message: 'Promotion created successfully',
        data: promo,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const promo = await this.service.updatePromotion(Number(req.params.id), req.body);
      res.status(200).json({
        success: true,
        message: 'Promotion updated successfully',
        data: promo,
      });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.service.deletePromotion(Number(req.params.id));
      res.status(200).json({ success: true, message: result.message });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}