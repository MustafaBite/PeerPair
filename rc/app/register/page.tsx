import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Email domain validation
    if (!formData.email.endsWith('@firat.edu.tr')) {
      setError('Sadece Fırat Üniversitesi öğrencileri kayıt olabilir');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.fullName, formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
};

export default RegisterPage; 