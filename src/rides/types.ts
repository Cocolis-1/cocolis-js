export type CanMatchParams = {
  from: object;
  to: object;
  volume: number;
  content_value?: number;
};

export type CreateParams = {
  description: string;
  from_lat?: number;
  to_lat?: number;
  from_lng?: number;
  to_lng?: number;
  from_address?: string;
  to_address?: string;
  from_postal_code?: string;
  to_postal_code?: string;
  from_pickup_date: string;
  to_pickup_date: string;
  is_packaged: boolean;
  is_passenger: boolean;
  from_is_flexible: boolean;
  to_is_flexible: boolean;
  content_value?: number;
  with_insurance?: boolean;
  price?: number;
  volume?: number;
  environment?: string;
  ride_extra_information?: string;
  from_need_help?: boolean;
  from_need_help_floor?: boolean;
  from_need_help_elevator?: boolean;
  from_need_help_furniture_lift?: boolean;
  to_need_help?: boolean;
  to_need_help_floor?: boolean;
  to_need_help_elevator?: boolean;
  to_need_help_furniture_lift?: boolean;
  ride_objects_attributes?: any[any];
  ride_delivery_information_attributes: any[any];
  photos?: string[];
  external_id?: string;
  photo_urls?: string[];
};

export type CanMatch = {
  result: boolean;
  estimated_prices: {
    regular: number;
    with_insurance: number | null;
  };
  insurance_detail: {
    amount: number;
    conditions_url: string;
  };
  rider_count: number;
};
