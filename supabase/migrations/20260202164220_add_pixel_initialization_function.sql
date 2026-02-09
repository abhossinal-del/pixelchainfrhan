/*
  # إضافة دالة إنشاء البكسلز الأولية

  ## نظرة عامة
  هذا الـ migration يضيف دالة PostgreSQL لإنشاء البكسلز الأولية بكفاءة
  ويوفر آلية للحصول على بكسل أو إنشائه إذا لم يكن موجوداً.

  ## الدوال الجديدة
  
  ### 1. `initialize_pixels_batch`
  إنشاء مجموعة من البكسلز بشكل فعال
  - Parameters: start_id (integer), end_id (integer)
  - ينشئ البكسلز من start_id إلى end_id
  
  ### 2. `get_or_create_pixel`
  الحصول على بكسل أو إنشائه إذا لم يكن موجوداً
  - Parameters: pixel_id (integer)
  - Returns: pixel record
  
  ## الغرض
  هذه الدوال تضمن إنشاء البكسلز بشكل ديناميكي عند الحاجة
  وتوفير أداء أفضل من إنشاء مليون سجل مرة واحدة.
  
  ## الأمان
  - جميع البكسلز الجديدة تكون متاحة للبيع بشكل افتراضي
  - السعر الافتراضي 0.001 ETH
  - لا يوجد مالك أولي (owner_id = NULL)
*/

-- دالة لإنشاء دفعة من البكسلز
CREATE OR REPLACE FUNCTION initialize_pixels_batch(start_id integer, end_id integer)
RETURNS void AS $$
BEGIN
  INSERT INTO pixels (id, x, y, current_price, purchase_price, is_for_sale)
  SELECT 
    i as id,
    ((i - 1) % 1000) as x,
    ((i - 1) / 1000) as y,
    0.001 as current_price,
    0.001 as purchase_price,
    true as is_for_sale
  FROM generate_series(start_id, end_id) as i
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة للحصول على بكسل أو إنشائه
CREATE OR REPLACE FUNCTION get_or_create_pixel(pixel_id integer)
RETURNS pixels AS $$
DECLARE
  result pixels;
  pixel_x integer;
  pixel_y integer;
BEGIN
  -- محاولة الحصول على البكسل
  SELECT * INTO result FROM pixels WHERE id = pixel_id;
  
  -- إذا لم يكن موجوداً، أنشئه
  IF NOT FOUND THEN
    pixel_x := ((pixel_id - 1) % 1000);
    pixel_y := ((pixel_id - 1) / 1000);
    
    INSERT INTO pixels (id, x, y, current_price, purchase_price, is_for_sale)
    VALUES (pixel_id, pixel_x, pixel_y, 0.001, 0.001, true)
    RETURNING * INTO result;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- إنشاء أول 10000 بكسل للأداء الأفضل
SELECT initialize_pixels_batch(1, 10000);

-- إضافة policy للقراءة العامة للبكسلز (حتى للمستخدمين غير المسجلين)
DROP POLICY IF EXISTS "Anyone can view pixels" ON pixels;

CREATE POLICY "Public can view pixels"
  ON pixels FOR SELECT
  USING (true);

-- إضافة policy للسماح بإنشاء البكسلز تلقائياً
CREATE POLICY "System can insert pixels"
  ON pixels FOR INSERT
  WITH CHECK (true);