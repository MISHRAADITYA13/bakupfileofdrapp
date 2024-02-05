import { Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { prescrSchema } from './schemas/prescr.schema';
import { PrescriptionDTO } from './dtos/prescr.dto';
@Injectable()
export class prescrService {
  constructor(@InjectModel(prescrSchema.name) private prescriptionModel: Model<prescrSchema>) {}

  async create(prescriptionDTO: PrescriptionDTO): Promise<PrescriptionDTO> {
    const createdPrescription = new this.prescriptionModel(prescriptionDTO);
    return createdPrescription.save();
  }

   

  async getPrescriptionsByDocId(docId: string): Promise<prescrSchema[]> {
    console.log("the service is fine");
    try {
      const prescriptions = await this.prescriptionModel.find({ doc_id: docId }).exec();
      if (!prescriptions || prescriptions.length === 0) {
        throw new NotFoundException(`No prescriptions found for doc_id: ${docId}`);
      }
      return prescriptions;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching prescriptions:');
      

    }
  }
}

