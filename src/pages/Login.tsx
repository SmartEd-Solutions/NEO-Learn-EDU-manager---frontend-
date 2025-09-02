@@ .. @@
       if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and confirm your account before logging in.');
        } else {
          toast.error('Login failed: ' + error.message);
        }
      } else {
        toast.success('Login successful!');
        // Small delay to show success message before redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');